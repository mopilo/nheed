import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,
    ScrollView, TextInput, RefreshControl, Image, FlatList, ToastAndroid} from 'react-native';
import { REQUEST_URL, HOME_URL } from '../../component/Utility/local';
import {Thumbnail} from 'native-base'
import {connect} from 'react-redux'


class Comment extends Component{

    state = {
        text: '',
        refreshing: true,
        comments: [],
        post: []
    }

    componentDidMount(){
        this.fetchComments()
    }

    onRefresh = () => this.fetchComments();

    // FETCH COMMENTS

    fetchComments = () => {
        let token = this.props.token;
        let userId = this.props.userId;
        let photoID = this.props.navigation.state.params.post;
        const url = REQUEST_URL + HOME_URL + userId + '/posts/' + photoID;
        // const url = REQUEST_URL + HOME_URL + userId + '/' + photoID + '/comments/'
        this.setState({ refreshing: true})
        fetch(url, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => { return res.json() })
        .then(response => {
            this.setState({
                refreshing: false,
                comments: response.comments,
                post: response.post
            })
            console.log(this.state.comments)
            return response
        })
        .catch((err)=> console.log(err))
    }

    // POST COMMENTS 
    postComment = () => {
        let token = this.props.token;
        let userId = this.props.userId;
        let photoID = this.props.navigation.state.params.post;

        const url = REQUEST_URL + HOME_URL + userId + '/' + photoID + '/comments/'
        this._scrollView.scrollTo({ y: 0 });
        if (this.state.text.trim() === '') {
            ToastAndroid.showWithGravity(
                "Field can't be empty",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        } 
        else{
            fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    comment: {
                        post_id: photoID,
                        account_id: userId,
                        comment: this.state.text,
                    }
                })
            })
            .then((res)=> {return res.json()})
            .then((response)=> {
                this.setState({
                    data: response.data,
                    text: ''
                })
                this.fetchComments();
                console.log(this.state.data, " post data")
                return response;
            })
        }
        
    }

    renderItem = ({item}) => {
        return(
            <View>
                <View style={{flexDirection:'row', justifyContent: 'space-between',alignItems: 'center', padding: 5}}>
                <View style={{flex: 0.8}}>
                    <Thumbnail square source={{uri: item.account.profile_picture}} style={{ height: 35, width: 35 }}/>
                </View>
                <View style={{flex: 6, flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={{fontFamily: 'Lato-Bold', fontSize: 12, color: '#000'}}>{item.account.name}</Text>
                    <Text style={{fontFamily: 'Lato-Light', fontSize: 12}}>time</Text>
                </View>

            </View>
                <Text style={{fontFamily: 'Lato-Regular', fontSize: 14, padding: 5, marginBottom: 10, color:'#000'}}>{item.comment}</Text>
            </View>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.body}>
                {/* SCROLL LIST */}
                    <ScrollView
                        ref={(scrollView) => {this._scrollView = scrollView;}}
                        refreshControl = {
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }

                    >
                    {
                        this.state.post.caption ?
                        <View style={{flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 0.5, marginBottom: 5}}>
                            <Thumbnail square source={{uri: this.props.pic}} style={{ height: 30, width: 30, borderRadius: 5 }}/>
                            <Text style={{fontSize: 14, fontFamily: 'Lato-Regular', margin: 10, alignSelf: 'flex-start' }}>
                                {this.state.post.caption}
                            </Text>
                        </View> : null
                    }
                    
                    <FlatList
                        data={this.state.comments}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => item.id.toString()}
                    />
                    </ScrollView>
                </View>
                <View style={styles.tabBar}>
                    <View style={{flex: 1}}>
                        <View style={{width: 35, height: 35, justifyContent: 'center', alignItems: 'center'}}>
                            <Thumbnail square source={{uri: this.props.pic}} style={{ height: 30, width: 30, borderRadius: 5 }}/>
                        </View>
                    </View>
                    <View style={{flex: 6}}>
                        <TextInput
                            placeholder= 'Add a comment...'
                            placeholderTextColor='#000'
                            underlineColorAndroid = 'transparent'
                            style={{fontFamily: 'Lato-Regular', fontSize: 14, color: '#000'}}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.text}
                            maxLength={150}
                            multiline = {true}
                            numberOfLines = {10}
                        />
                    </View>

                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={this.postComment} >
                            <Text style={{color: '#000', fontFamily: 'Lato-Regular', fontSize: 16, margin: 5}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1
    },
    tabBar: {
        backgroundColor: '#fff',
        height: 60,
        borderTopWidth: 0.5,
        borderColor: '#E5E5E5',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10
    }
})


const mapStateToProps = state => {
    return {
        pic: state.homeReducer.pic,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        network: (status) => dispatch(isConnected(status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)