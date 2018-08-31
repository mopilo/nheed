import React, {Component} from 'react';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Feather';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'


export default class ImagePost extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            tabBarLabel: 'Picture',
            // tabBarOnPress: ({ scene, jumpToIndex }) => {
            //     // const { route, index, focused} = scene;
            //     if (!scene.focused) {
            //         jumpToIndex(scene.index)
            //     }
            // }
        }
    }
    constructor() {
        super();
        this.camera = null;
        this.state = {
            path: null,
            cameraPermission: false,
            type: RNCamera.Constants.Type.back,
            flash: RNCamera.Constants.FlashMode.off,
        }
    }

    rotateCamera = () => {
        this.setState(state => ({
            type:
                state.type === RNCamera.Constants.Type.back
                ?
                RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }))
    }

    switchFlash = () => {
        this.setState(state => ({
            flash:
                state.flash === RNCamera.Constants.FlashMode.off
                ?
                RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off
        }))
    }

    takePicture = async function () {
        if (!this.camera) { return }
        else {
            const options = { quality: 0.3, base64: true, fixOrientation: false, width: 1920, skipProcessing: false };
            const data = await this.camera.takePictureAsync(options)
            this.setState({ path: data.uri })

        }
    };

    postImage = () => {
        this.props.navigation.navigate('Post', {image: this.state.path})
        console.log(this.state.path)
        this.setState({ path: null })
    }

    changeState = () => {
        alert('we')
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
                            name='refresh-ccw'
                            size={26}
                            color="white"
                            onPress={this.rotateCamera}
                        />
                        <Icon
                            name='zap'
                            size={26}
                            color="white"
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
                    <Icon
                        name='circle'
                        size={80}
                        color='black'
                        onPress={this.takePicture.bind(this)}
                    />
                </View>
            </View>
        );
    }

    renderImage() {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.state.path }}
                    style={styles.camera}
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
                    <View style={{ height: 150, flex: 1 }}>
                    <ScrollView contentContainerStyle={{ justifyContent: 'center' }} horizontal showsHorizontalScrollIndicator={false}>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 4 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={this.changeState}>
                                        <Image source={{ uri: this.state.path }}
                                            style={{ width: 100, height: 100, margin: 5, opacity: 0.9, backgroundColor: 'grey' }}
                                        />
                                    </TouchableOpacity>

                                </View>

                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Image source={{ uri: this.state.path }}
                                        style={{ width: 100, height: 100, margin: 5, opacity: 0.9, backgroundColor: 'red' }}
                                    />
                                </View>

                            </View>

                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ justifyContent: 'center' }}>
                                    <Image source={{ uri: this.state.path }}
                                        style={{ width: 100, height: 100, margin: 5, opacity: 0.4, backgroundColor: 'orange' }}
                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ justifyContent: 'center' }}>
                                    <Image source={{ uri: this.state.path }}
                                        style={{ width: 100, height: 100, margin: 5, opacity: 0.6, backgroundColor: 'grey' }}
                                    />
                                </View>
                            </View>
                        </View> */}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }


    render() {
        // const {cameraPermission} = this.state;
        // if (!cameraPermission) return <View style={styles.container}/>
        // if(cameraPermission === false){
        //     return(
        //         <View style={styles.container}><Text>No camera Permission!!!</Text></View>
        //     )
        // }
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
