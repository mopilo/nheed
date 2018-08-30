import React, {Component} from 'react'
import {View, Text} from 'react-native'
import CameraRollPicker from 'react-native-camera-roll-picker';


class Upload extends Component{
getSelectedImages = () => {
}

    render(){
        return(
            <CameraRollPicker
            callback={this.getSelectedImages.bind(this)}
            maximum={1}
            backgroundColor = '#fff'
        />
        )
    }
}

export default Upload