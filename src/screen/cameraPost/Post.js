import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ToastAndroid, Keyboard,
    KeyboardAvoidingView, TouchableOpacity, NetInfo, AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import Geocoder from 'react-native-geocoding';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux'
import { REQUEST_URL, HOME_URL, HOME_POST } from '../../../component/Utility/local';
import * as Progress from 'react-native-progress';


// AIzaSyD10yxqkK3FgbKBQgijjcFwxFcY4DsoHKE


class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            place: 'Abuja',
            error: null,
            text: '',
            progress: 0
        }
    }

    //header
    static navigationOptions = ({ navigation }) => {

        const { params ={} } = navigation.state
        return{
        headerLeft: <Icon name="chevron-left" size={35} color='black' onPress={() => navigation.goBack()} />,
        headerRight: <TouchableOpacity onPress={()=>params.postImage()}>
            <Text style={{ margin: 5, fontSize: 16 }}>Share</Text>
        </TouchableOpacity>

        }
    };

    componentWillMount() {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null
                }, () => this.getData());
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
        this.props.navigation.setParams({ postImage: this.upload })
    }

    getData =() => {
        Geocoder.init('AIzaSyD10yxqkK3FgbKBQgijjcFwxFcY4DsoHKE'); // use a valid API key
        Geocoder.from(this.state.latitude, this.state.longitude)
        .then(res=> {
            let place = res.results[0].address_components[2];
            let location = res.results[0].address_components[3];
            this.setState({place: place.short_name + "  " + location.short_name})
            console.log(place.short_name + "  " + location.short_name)
        })
        .catch((error) => {console.log(error)})
    }

     upload =() => {
        Keyboard.dismiss;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                alert('Device Offline')
            }
            else {
                if (this.props.navigation.state.params.image) {
                        const token = this.props.token
                        const userId = this.props.userId
                        let progress = 0;
                        this.setState({progress})
                        const url = REQUEST_URL + HOME_URL + userId + HOME_POST
                        if (token) {
                            RNFetchBlob.fetch('POST', url, {
                                'Accept': 'application/json',
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${token}`
                            }, [
                                    // custom content type
                                    { name: 'media', filename: 'avatar-png.jpg', type: 'image/jpg', data: RNFetchBlob.wrap(this.props.navigation.state.params.image) },
                                    { name: 'post_type', data: 'image' },
                                    { name: 'caption', data: this.state.text },
                                    { name: 'location', data: this.state.place },
                                    { name: 'premium', data: 'true' }
                                ])
                                .uploadProgress((written, total) => {
                                    console.log('uploaded', written / total)
                                    setInterval(()=> {
                                        progress += written/total
                                        if(progress > 1){
                                            progress = 1
                                        }
                                        this.setState({progress})
                                    }, 100)
                                })
                                .then((res) => { return res.json() })
                                .then((resData) => {
                                    ToastAndroid.showWithGravity(
                                        'Uploading.....',
                                        ToastAndroid.LONG,
                                        ToastAndroid.CENTER
                                    );
                                    this.props.navigation.navigate('Home');
                                    return resData
                                })
                                .catch(err => {
                                    ToastAndroid.showWithGravity(
                                        'Uploading Failed, Retry',
                                        ToastAndroid.LONG,
                                        ToastAndroid.CENTER
                                    );
                                    console.log(err);
                                })
                        }
                        else{ this.props.navigation.navigate('SignIn')}
                }
                else {
                    alert('no image')
                }
            }
        })
    }

    render() {
        console.log(this.state.latitude)

        return (
            <View style={styles.container} >

                <KeyboardAvoidingView style={styles.captionBody} behavior="padding">
                    <View style={{ flex: 1, height: 100, margin: 5, justifyContent: 'center' }}>
                        <Image source={{uri: this.props.navigation.state.params.image}} style={{width: 80, height: 80}}/>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <TextInput
                            placeholder="caption"
                            underlineColorAndroid="transparent"
                            multiline={true}
                            onChangeText={(text) => this.setState({ text })}
                        />
                    </View>
                </KeyboardAvoidingView>
                <View style={{ flex: 2 }}>
                <Text>Progress Example</Text>
                <Progress.Bar
          style={{margin: 10}}
          progress={this.state.progress}
        />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    captionBody: {
        flex: 5,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        flexDirection: 'row',
        position: 'absolute',
        top: 10,
    }
}) 
const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

export default connect(mapStateToProps)(Post)
  