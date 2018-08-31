import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import moment from 'moment';
import { FlatList, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback,
    Modal, ActivityIndicator, Dimensions, TouchableNativeFeedback } from 'react-native';
import { Card, Container, Button, Left, Header, Thumbnail, CardItem, Body, Right, Text } from 'native-base';
import { CachedImage } from 'react-native-cached-image';


const { width } = Dimensions.get('window')
const numColumns = 3;

export default class TabOne extends Component {

    state = {
        image: '',
        modalVisible: false
    }


    formatData = (data, numColumns) => {
        if (data == undefined){return}
        else{
            const numberOfFullRows = Math.floor(data.length / numColumns);
      
            let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
            while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
              data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
              numberOfElementsLastRow++;
            }
          
            return data;
        }

      };

    renderElement = (item) => {

        if (item.post_type === "video") {
            return <Video
                source={{ uri: item.url }}
                style={{ height: width/3.3, width: width/3.3 }}
                resizeMode="cover"
                volume={0}
                repeat={true}
                playInBackground={false}
                playWhenInactive={false}
            />;
        }
    }
    showModal = (imageUri) => {
        this.setState({
            image: imageUri.url,
            name: imageUri.account.name,
            postType: imageUri.post_type,
            profilePic: imageUri.account.profile_picture,
            time: imageUri.inserted_at,
            caption:imageUri.caption,
            comment: imageUri.comment_count,
            like: imageUri.like_count,
            liked: imageUri.liked,
            modalVisible: true
        })
    }


    userProfile = () => {

    }

    renderItem = ({ item }) => {

        return (
            <View style={{ flex: 1, justifyContent: 'center', margin: 2, alignItems: 'center' }}>
                <TouchableOpacity onPress={this.showModal.bind(this, item)}>
                {this.renderElement(item)}
            </TouchableOpacity>
            </View>
        )
    }


    render() {
        let time = this.state.time;
        let utcDate = time;
        let localDate = new Date(utcDate);
        let now = moment(localDate, 'YYYY-MM-DDTHH:mm:ss').fromNow(true);
        
        return (
            this.props.isloading ?
                <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: '#fff' }}>
                    <ActivityIndicator animating={true} size="small" color="#000" />
                </View>
                :
                this.props.video === 0 ?
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                    <MIcon name="play-box-outline" size={45} color='#000' style={{alignSelf: 'center'}}/>
                    <Text style={{color: '#000', alignSelf: 'center'}}>No Post</Text>
                </View>
                :
                <View style={styles.container}>
                    <FlatList
                        data={this.formatData(this.props.totalPost, numColumns)}
                        renderItem={this.renderItem}
                        numColumns={3}
                        keyExtractor={(item) => item.id}
                    >
                    </FlatList>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.setState({ modalVisible: false })}
                    >
                        <Container style={{backgroundColor: '#fff'}}>
                            <Header style={{ backgroundColor: "#fff" }}>
                                <Left>
                                    <Button transparent>
                                        <Icon
                                            name="arrow-left"
                                            size={20}
                                            onPress={() => this.setState({ modalVisible: false })}
                                            color='#000'
                                        />
                                    </Button>
                                </Left>
                                <Body/>
                            </Header>
                            <View style={{flex:1, backgroundColor: '#fff', borderBottomWidth: 2, borderColor: '#fff'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                                    <View style={{flex: 0.8, margin: 10}}>
                                        <TouchableOpacity>
                                            <Thumbnail square source={{ uri: this.state.profilePic }} style={{ height: 30, width: 30, borderRadius: 5 }} />
                                    </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 4}}>
                                        <Text note style={{ fontSize: 12, fontFamily: 'Lato-Bold', color: '#000' }}>{this.state.name}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', alignContent: 'center' , flex: 1}}>
                                        <Icon name="clock" size={18} style={{ color: '#000' }} />
                                        <Text note style={{ padding: 5, fontSize: 10, fontFamily: 'Lato-Regular', color: '#000', margin: 2 }}>{now}</Text>
                                    </View>

                                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center', margin: 4}}>
                                        <Button transparent>
                                            <MIcon name="dots-vertical" size={15} style={{ color: 'grey' }} />
                                        </Button>
                                    </View>
                                </View>
                                <CardItem cardBody style={{backgroundColor: '#fff'}}>
                                    { this.state.postType === 'video' ?
                                        <Video source={{ uri: this.state.image }}
                                        repeat={true}  // Repeat forever. Default false
                                        resizeMode="cover"
                                        volume={1}
                                        style={{ width: null, height: 350, flex: 1 }} /> 
                                        :
                                        null
                                    }
                                </CardItem>

                                <View style={{flexDirection: 'row', marginBottom: -5}}>
                                    <View style={{flexDirection: 'row', margin: 2, padding: 10, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                                        {   
                                            this.state.liked === true ?
                                            <TouchableNativeFeedback>
                                                <MIcon name="heart" size={25} style={{ color: '#000' }} />
                                            </TouchableNativeFeedback>
                                            :
                                            <TouchableNativeFeedback >
                                                <MIcon name="heart-outline" size={25} style={{ color: '#000' }} />
                                            </TouchableNativeFeedback>
                                        }
                                        <Text style={{ fontSize: 14, color: '#000', padding: 5 }}>{this.state.like}</Text>

                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
                                        <TouchableNativeFeedback transparent style={{ marginLeft: 10 }}>
                                            <Icon name='message-circle' size={25} color='#000' />
                                        </TouchableNativeFeedback>
                                        <Text style={{ fontSize: 14, color: '#000', padding: 5 }}>{this.state.comment}</Text>
                                    </View>
                            </View>   
                            {
                                this.state.caption === null ? null :
                                <View style={{marginLeft: 15, marginTop: 5}}>
                                    <Text style={{color: '#000'}}>{this.state.caption}</Text>
                                </View> 

                            }  
                            </View>
                        </Container>
                    </Modal>
                </View>
        );
    }
}

//styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
