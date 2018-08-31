import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import CameraRollPicker from 'react-native-camera-roll-picker';
import ImagePicker from 'react-native-image-crop-picker';



class Upload extends Component{

    static navigationOptions = ({ navigation }) => ({
        headerRight: (typeof (navigation.state.params) === 'undefined' || typeof (navigation.state.params.headerRight) === 'undefined' ?
            <Icon name="camera" size={25} color='#000000' style={{ padding: 10 }} onPress={() => { navigation.navigate('ImagePost') }} /> : navigation.state.params.headerRight),
        headerLeft: (<Text style={{ padding: 10, fontSize: 16, color: '#000000' }}>Gallery</Text>),
    });

    state ={
        resizedImageUri: '',
        selected: [],
        image: ''
    }

    getSelectedImages = () => {
        let result = this.state.selected.map((a)=>{return a.uri}).toString();
        if (result) {
            this.props.navigation.setParams({
                headerRight:
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({selected: []})
                             ImagePicker.openCropper({
                                 path: result,
                                 width: width,
                                 height: width,
                                 compressImageQuality: 1
                             }).then(image => {
                                 this.setState({
                                     image: image.path,
                                     selected: []
                                 });
                                 if (this.state.image) {
                                     this.props.navigation.navigate('Post', {
                                         image: this.state.image
                                     })
                                     this.props.navigation.setParams({
                                    headerRight:
                                        <Icon name="camera" size={25} color='#000' style={{ padding: 10 }} 
                                        onPress={()=> this.props.navigation.navigate('ImagePost')} />
                                    })
                                 } else {
                                     return
                                 }
                                 console.log(this.state.image)
                             }).catch(e => {
                                 this.setState({
                                     image: '',
                                     selected: []
                                 });
                                 this.props.navigation.setParams({
                                    headerRight:
                                        <Icon name="camera" size={25} color='#000' style={{ padding: 10 }} 
                                        onPress={()=> this.props.navigation.navigate('ImagePost')} />
                                    })
                                 console.log(e);
                             });
                            }
                        }
                    >
                        <Text style={{ padding: 10, color: '#000' }}>
                            Done
                        </Text>
                    </TouchableOpacity>
            })
        }

        else {
            this.props.navigation.setParams({
                headerRight:
                    <Icon name="camera" size={25} color='#000' style={{ padding: 10 }} 
                    onPress={()=> this.props.navigation.navigate('ImagePost')} />
            })
        }

    }

    render(){
        return(
            <CameraRollPicker
            callback={this.getSelectedImages.bind(this)}
            maximum={1}
            selected={this.state.selected}
            backgroundColor = '#fff'
        />
        )
    }
}

export default Upload