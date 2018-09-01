import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Container, Header, Title } from 'native-base';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    NetInfo,
    AsyncStorage,
    ToastAndroid,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    TextInput,
    Dimensions
} from 'react-native';
import moment from 'moment';
// import { REQUEST_URL, HOME_URL, HOME_URL_LAST, HOME_POST } from '../Utility/local'
import { CachedImage } from 'react-native-cached-image';
import {connect} from 'react-redux'
import {isConnected} from '../../store/Actions/isConnected'
import {fetchMyProfile} from '../../store/Actions/index'
import Video from 'react-native-video'
import { REQUEST_URL, HOME_URL, HOME_URL_LAST, EXPLORE} from '../../component/Utility/local';


const {width} = Dimensions.get('window');

class ListPost extends Component {

    // static navigations to hold nav icons and titiles
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        return {
            headerRight:(
                <MIcon name='dots-vertical' size={23} color='black' onPress={()=> alert('Notification')} style={{margin: 4}}/>,
                <TouchableOpacity onPress={() => { navigation.navigate('MyProfile') }}>
                        <View style={{ width: 40, height: 40, margin: 4, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <CachedImage
                                source={{ uri: params.pic }}
                                style={{ width: 30, height: 30, borderRadius: 5}}
                            />
                        </View>
                    </TouchableOpacity>
            )
        }
    };


    state = {
        text: '',
        comment: '',
        lastPress: 0,
        liked: '',
        disabled: false
    }

    componentWillMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        this.props.navigation.setParams({ 'pic': this.props.pic });
        // this.fetchData()
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }



    // for network check
    _handleConnectionChange = (isConnected) => {
        this.props.network({status: isConnected})
    };


//    fetchData = () => {
//         const token = this.props.token;
//         const userId = this.props.userId;
//         const url = REQUEST_URL + HOME_URL + userId + EXPLORE;
//         let play;
//         let exa;
//         let index = this.props.navigation.state.params.index;

//         if (token) {
//             fetch(url, {
//                 headers: {
//                     'content-type': 'application/json',
//                     'Accept': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//                 .then(res => { return res.json() })
//                 .then((resData) => {
//                     if (resData.message) {
//                         ToastAndroid.showWithGravity(
//                             resData.message,
//                             ToastAndroid.SHORT,
//                             ToastAndroid.CENTER
//                         );
//                     }
//                     else {
//                         play = resData.data;
//                         exa = play.find((e) => {return e.id === index});
//                         this.setState({
//                             token: token,
//                             userId: userId,
//                             data: exa
//                         })
//                     }
//                     return resData;
//                 }).catch((error) => {
//                     console.log(error)
//                 }).done
//         }

//     }

    // opens comment screen
    comment = (photoId) => {
        // if(!this.state.disabled){
        //     this.props.navigation.navigate('Comments', { userId: this.state.userId, token: this.state.token, post: photoId, profile_picture: this.state.profile_picture })
        //     this.setState({disabled: true});
        //     setTimeout(()=>{
        //         this.setState({
        //          disabled: false,
        //        });
        //      }, 5000)
        // }
    }

    // posting comment from a post
    submitComment = (photoId) => {
        // const url = REQUEST_URL + HOME_URL + this.state.userId + '/' + photoId + '/comments/'
        // if (this.state.text === '') {
            
        //     ToastAndroid.showWithGravity(
        //         "Field can't be empty",
        //         ToastAndroid.SHORT,
        //         ToastAndroid.CENTER
        //     );
        // } 
        // else{
        //     fetch(url,{
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //             'Authorization': `Bearer ${this.state.token}`
        //         },
        //         body: JSON.stringify({
        //             comment: {
        //                 post_id: photoId,
        //                 account_id: this.state.userId,
        //                 comment: this.state.text
        //             }
        //         })
        //     })
        //     .then((res)=> {return res.json()})
        //     .then((response)=> {
        //         // let  {textInputs}  = this.state;
        //         // textInputs[photoId] = '';
        //         this.setState({
        //             text: ''
        //         });
        //         console.log('commenting', response.data)
        //         this.reRender()
        //         return response;
        //     })
        // }
    }

    //re-renders to show like
    reRender = (photoId) => {
        // const url = REQUEST_URL + HOME_URL + this.state.userId + HOME_URL_LAST;
        // fetch(url, {
        //     headers: {
        //         'content-type': 'application/json',
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${this.state.token}`
        //     }
        // })
        //     .then(res => { return res.json() })
        //     .then((resData) => {
        //         if (resData.message) {
        //             ToastAndroid.showWithGravity(
        //                 resData.message,
        //                 ToastAndroid.SHORT,
        //                 ToastAndroid.CENTER
        //             );
        //         }
        //         else {
        //             // let text = resData.data
        //             // let photoLiked = text.filter((item) => { return item.id == photoId})
        //             // photoLiked.forEach(word => { this.setState({likes: word.liked})})

        //             // let photoCount = text.filter((item)=> {return item.id == photoId})
        //             // photoCount.forEach(count => {this.setState({})})
        //             let play = resData.data;
        //             let index = this.props.navigation.state.params.index;
        //             let exa = play.find((e) => {return e.id === index});
        //             this.setState({
        //                 data: exa,
        //                 // time: resData.
        //             })

        //         }

        //         return resData;
        //     }).catch((error) => {
        //         console.log(error)
        //     })
    }

    unlikePhoto = (photoId) => {
        // const url = likeUrl + this.state.userId + '/unlike/' + photoId;

        // fetch(url, {
        //     headers: {
        //         'content-type': 'application/json',
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${this.state.token}`
        //     }
        // })
        //     .then(res => res.json())
        //     .then(resp => {
        //         this.setState({
        //             liked: resp
        //         })
        //         this.reRender(photoId)
        //         return resp
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }

    likePhoto = (photoId) => {
        // const url = likeUrl + this.state.userId + '/like/' + photoId;
        // fetch(url, {
        //     headers: {
        //         'content-type': 'application/json',
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${this.state.token}`
        //     }
        // })
        //     .then(res => res.json())
        //     .then(resp => {
        //         this.setState({
        //             liked: resp
        //         })
        //         this.reRender(photoId)
        //         return resp
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }


    liked = (photoId) => {
        // const url = likeUrl + this.state.userId + '/like/' + photoId;
        // var doublePressed = new Date().getTime() - this.state.lastPress;

        // if (doublePressed < 400) {
        //     // double tap happend
        //     fetch(url, {
        //         headers: {
        //             'content-type': 'application/json',
        //             'Accept': 'application/json',
        //             'Authorization': `Bearer ${this.state.token}`
        //         }
        //     })
        //         .then(res => res.json())
        //         .then(resp => {
        //             this.setState({
        //                 liked: resp
        //             })
        //             this.reRender(photoId)
        //             return resp
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })
        // }
        // this.setState({
        //     lastPress: new Date().getTime()
        // })
    }

    //opens the view profile
    userProfile = (item) => {
        this.props.viewProfile(item)
    }

    //item from flat list
    renderItem = (item) => { 
     if(item){
        let time = item.inserted_at;
        let utcDate = time;
        let localDate = new Date(utcDate);
        let now = moment(localDate, 'YYYY-MM-DDTHH:mm:ss').fromNow(true);
        return (
            <View style={{flex:1, backgroundColor: '#fff', borderBottomWidth: 2, borderColor: '#fff'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                    <View style={{flex: 0.8, margin: 10}}>
                        <TouchableOpacity onPress={this.userProfile.bind(this, item.account.id)}>
                            <Thumbnail square source={{ uri: item.account.profile_picture }} style={{ height: 30, width: 30, borderRadius: 5 }} />
                       </TouchableOpacity>
                    </View>
                    <View style={{flex: 4}}>
                        <Text note style={{ fontSize: 12, fontFamily: 'Lato-Bold', color: '#000' }}>{item.account.name}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', alignContent: 'center' , flex: 1}}>
                        <Icon name="clock" size={18} style={{ color: '#000' }} />
                        <Text note style={{ padding: 5, fontSize: 10, fontFamily: 'Lato-Regular', color: '#000', margin: 2 }}>{now}</Text>
                    </View>

                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center', margin: 4}}>
                        <Button transparent>
                             <MIcon name="dots-vertical" size={15} style={{ color: '#000' }} />
                       </Button>
                    </View>
                </View>
                <View style={{marginTop: 4, marginBottom: -5}}>
                    <TouchableWithoutFeedback onPress={() => this.liked(item.id)}>
                        {
                            item.post_type === 'image' ? 
                            <CachedImage source={{ uri: item.url }} 
                            resizeMode="cover" resizeMethod='auto'
                            style={{ width: null, height: 350, flex: 1 }} 
                        />  
                            :
                            <Video source={{uri: item.url}} style={{ width: null, height: 350, flex: 1 }} />
                        }
                        
                    </TouchableWithoutFeedback>
                        <View style={{flex: 1, flexDirection: 'row', marginBottom: 0, position: 'absolute', bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.2)', opacity: 0.3, justifyContent: 'flex-end', width: width}}>
                            <View style={{flexDirection: 'row', margin: 2, padding: 5, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                                {   item.liked === true ?
                                    <View style={{ padding: 3}}>
                                        <TouchableNativeFeedback onPress={() => this.unlikePhoto(item.id)}>
                                            <MIcon name='heart' size={16} color='#000' />
                                        </TouchableNativeFeedback>
                                    </View>
                                    :
                                    <View style={{ padding: 3}}>
                                        <TouchableNativeFeedback onPress={() => this.likePhoto(item.id)}>
                                            <MIcon name='heart-outline' size={16} color='#000' />
                                        </TouchableNativeFeedback>
                                    </View>
                                }
                                <Text style={{ fontSize: 12, color: '#000', padding: 5, fontFamily: 'Lato-Regular', margin: 0 }}>{item.like_count}</Text>

                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center', marginRight: 4}}>
                                <View style={{ padding: 3}}>
                                    <TouchableNativeFeedback transparent style={{  }} onPress={() => this.comment(item.id)}>
                                        <Icon name='message-circle' size={16} color='#000' />
                                    </TouchableNativeFeedback>
                                </View>
                                <Text style={{ fontSize: 12, color: '#000', padding: 5, fontFamily: 'Lato-Regular', margin: 0 }}>{item.comment_count}</Text>
                            </View>
                        </View>   
                </View>
 
                
                {
                    item.caption === null ? null :
                    <View style={{margin:15}}>
                        <Text style={{color: '#000'}}>{item.caption}</Text>
                    </View> 

                 }  

                <View style={styles.tabBar}>
                    <View style={{ flex: 1 }}>
                        <Thumbnail square source={{ uri: this.props.pic }} style={{ height: 30, width: 30, borderRadius: 5 }} />
                    </View>
                    <View style={{ flex: 6 }}>
                        <TextInput
                            placeholder='Add a comment...'
                            placeholderTextColor='#000'
                            underlineColorAndroid='transparent'
                            style={{fontFamily: 'Lato-Regular', fontSize: 14, color: '#000'}}
                            value={this.state.text}
                            onChangeText={text => {
                                this.setState({
                                    text,
                                });
                            }}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={this.submitComment.bind(this, item.id)}>
                            <Text style={{color: '#000', fontFamily: 'Lato-Regular', fontSize: 14}}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
     }
        
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                {this.renderItem(this.props.data)}

            </ScrollView>
        );
    }
}

//styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    tabBar: {
        flex: 1,
         height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        marginTop: 5
    },
    volume: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'transparent',
    }
});

const mapStateToProps = state => {
    return {
        pic: state.homeReducer.pic,
        data: state.exploreReducer.listData,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        network: (status) => dispatch(isConnected(status)),
        viewProfile: (item) =>  dispatch(fetchMyProfile(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost)