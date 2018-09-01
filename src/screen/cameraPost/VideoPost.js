import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text
 } from 'react-native'
import { RNCamera } from 'react-native-camera';
import Video from 'react-native-video';
import secToMin from 'sec-to-min';

let startRecord = false;

// TODO yard add camera
export default class VideoPost extends Component {
    static navigationOptions = (navigation) => {
        return {
            header: null,
            tabBarLabel: 'Video',
            // tabBarOnPress: ({ scene, jumpToIndex }) => {
            //     // const { route, index, focused} = scene;

            //     if (!scene.focused) {
            //         jumpToIndex(scene.index)
            //     }
            // }
        }
    }
    
    constructor(props){
        super(props);
        this.state = {
            path: null,
            timer: 0,
            cameraPermission: false,
            type: RNCamera.Constants.Type.back,
            flash: RNCamera.Constants.FlashMode.off,
            isRecording: false
        }
    }
    

    // async componentWillMount(){
    //     const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    //         'title': 'Nheed Camera Permission',
    //         'message': 'Nheed requires access to your camera.'
    //     })
    //     if (status === PermissionsAndroid.RESULTS.Granted){
    //         console.log('take picture')
    //         this.setState({cameraPermission: true})
    //     }
    //     else{
    //         console.log('denied')
    //     }
    // }



    startRecord = async function () {
        if (!this.camera) { return }
        else{
            this.setState({isRecording: true})
            startRecord = setInterval(()=>{
                this.setState(prevState => ({
                    timer: prevState.timer + 1
                }));
            }, 1000)

            const options = { 
                quality: 'RNCamera.Constants.VideoQuality.720p', 
                // maxDuration: 300
            };
            const data = await this.camera.recordAsync(options)
            this.setState({ path: data.uri })
        }
        // if (this.camera) {
        // }
    };

    stopRecord = async = () => {
        if (this.camera) {
            this.camera.stopRecording()
            this.setState({
                isRecording: false,
                timer: 0
            })
            clearInterval(startRecord)        
        }
    }

    rotateCamera = () => {
        this.setState(state=>({
            type:
                state.type === RNCamera.Constants.Type.back 
                ? 
                RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }))
    }

    switchFlash = () => {
        this.setState(state=>({
            flash:
                state.flash === RNCamera.Constants.FlashMode.off
                ?
                RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off
        }))
    }


    postImage = () => {
        this.props.navigation.navigate('PostVideo', {video: this.state.path})
        console.log(this.state.path)
    }



    renderCamera() {

        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.camera}
                    type={this.state.type}
                    flashMode={this.state.flash}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                <View style={styles.icons}>
                    <Icon
                        name= 'refresh-ccw'
                        size = {26}
                        color = "white"
                        onPress={this.rotateCamera}
                    />
                    <Icon
                        name = 'zap'
                        size= {26}
                        color ="white"
                        onPress={this.switchFlash} 
                    />
                </View>
                </RNCamera>
                {/* <View style={styles.cameraButton}>
                    <TouchableOpacity style={styles.capture} onPress={this.takePicture.bind(this)}>
                        <View>

                        </View>
                    </TouchableOpacity>
                </View> */}

            <View style={styles.cameraButton}>
                <Text>{secToMin(this.state.timer)}</Text>
                    {
                       this.state.isRecording ?
                       <Icon
                       name = 'stop-circle'
                       size={80}
                       color = 'black'
                       onPress={this.stopRecord.bind(this)}
                  />
                  :
                  <Icon
                        name = 'circle'
                        size={80}
                        color = 'black'
                        onPress={this.startRecord.bind(this)}
                    />
                    }
                       
                </View>
            </View>
        );
    }

    renderImage() {
        return (
            <View style={styles.container}>
                <Video
                    source={{ uri: this.state.path }}
                    style={styles.camera}
                    resizeMode = 'cover'
                    repeat={true} 
                    volume={1}
                />
                <TouchableOpacity
                    style={styles.cancel}
                    onPress={() => this.setState({ path: null })}>
                    <Icon name="x" size={30} style={{ color: 'white' }} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.post}
                    onPress={this.postImage}>
                    <Icon name="arrow-right" size={30} style={{ color: 'white' }} />
                </TouchableOpacity>

                <View style={styles.cameraButton}>
                    <TouchableOpacity >
                        <View>
                            <Text>filter goes in here</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.path ? this.renderImage() : this.renderCamera()}
            </View>
        );
    }
}





//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    camera: {
        flex: 2,
    },
    cameraButton: {
        flex: 1,
        backgroundColor: '#e5e3e3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    capture: {
        width: 100,
        height: 100,
        borderColor: '#000',
        borderWidth: 20,
        alignSelf: 'center',
        margin: 50,
        borderRadius: 50,
        alignContent: 'center',
    },
    cancel: {
        position: 'absolute',
        left: 20,
        top: 20,
        backgroundColor: 'transparent',

    },
    post: {
        position: 'absolute',
        right: 20,
        top: 20,
        backgroundColor: 'transparent',

    },
    icons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'flex-end',
    }
})
/// TODO 
/// IF(TOKEN){CALLBACK FUNCTION}. RESPONSE