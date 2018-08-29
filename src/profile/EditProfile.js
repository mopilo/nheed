import React, { Component } from 'react';
import {
    StyleSheet,
    TextInput,
    Text, View,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    TouchableOpacity,
    NetInfo
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker'
import {connect} from 'react-redux'
import { Switch } from 'react-native-switch';
import { Picker } from 'native-base';
import {isConnected} from '../../store/Actions/isConnected'
import RNFetchBlob from 'react-native-fetch-blob';
import { fetchEditProfile, fetchNewProfile, addNewDp } from '../../store/Actions/index';

class EditProfile extends Component {

    state = {
        name: '',
        phone: '',
        email: '',
        address: '',
        bio: '',
        url: '',
        dataSource: [],
        photo: null,
        acct: false,
        selected2: undefined,
        token: '',
        userId: '',
        profile_picture: null
    }
    static navigationOptions = {
    }

    componentDidMount(){
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        this.props.storedProfile()
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (isConnected) => {
        this.props.network({status: isConnected})
    };

    // button for saving profile
    editProfile = () => {
        const newData = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
            bio: this.state.bio,
            url: this.state.url,
            acct: this.state.acct
        }
        this.props.newProfileData(newData);
    }

// add profile picture and send to server
    addPhoto = () => {
        this.props.addPhoto
    }

// SET USER PROFILE IN ASYNC STORE
    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    render() {
        let edit = this.props.data
        console.log(this.props.data)
        return (
            <ScrollView>
                <KeyboardAvoidingView style={styles.container}>
                    <View style={styles.profileHeader}>
                        <View style={{ height: 100, width: 100, flex: 1, margin: 20, backgroundColor: '#eee' }}>
                            <TouchableOpacity onPress={this.addPhoto} style={{ height: '30%', borderWidth: 1, top: '70%', backgroundColor: '#000', flexDirection: 'row', alignContent: 'center', zIndex: 8912 }}>
                                <View style={{ flex: 1, padding: 4 }}>
                                    <Icon name="camera" style={{ color: 'white' }} size={15} />
                                </View>
                                <View style={{ flex: 2, padding: 4 }}>
                                    <Text style={{ color: 'white', fontFamily: 'Lato-Bold', fontSize: 12 }}>Add Photo</Text>
                                </View>
                            </TouchableOpacity>

                            <Image style={{ height: 100, width: 100, alignSelf: 'center', top: '-25%' }}
                                source={
                                    this.state.photo != null ? 
                                        this.state.photo :
                                    this.state.profile_picture ?
                                    {uri:this.state.profile_picture} :
                                    require('../../assets/images/user.png') 

                                }
                                resizeMode='cover'
                            />

                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={styles.textInputFont}>{edit.email}</Text>
                        </View>
                    </View>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder={edit.name === null ? 'Name': edit.name}
                            style={styles.textInputBorder}
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            placeholder = {edit.phone === null ? 'Telephone' : edit.phone}
                            keyboardType="numeric"
                            value={this.state.phone}
                            style={styles.textInputBorder}
                            onChangeText={(phone) => this.setState({ phone })}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            placeholder={edit.email === null ? 'email' : edit.email}
                            keyboardType="email-address"
                            style={styles.textInputBorder}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            placeholder={edit.address === null ? 'Address' : edit.address}
                            style={styles.textInputBorder}
                            value={this.state.address}
                            onChangeText={(address) => this.setState({ address })}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            placeholder={edit.bio === null ? 'Bio' : edit.bio}
                            multiline={true}
                            numberOfLines={1}
                            value={this.state.bio}
                            style={styles.textInputBorder}
                            onChangeText={(bio) => this.setState({ bio })}
                            underlineColorAndroid="transparent"
                        />

                        <Picker
                            mode="dropdown"
                            placeholder="Gender"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            style={{ width: undefined }}
                            selectedValue={this.state.selected2}
                            onValueChange={this.onValueChange2.bind(this)}
                        >
                            <Picker.Item label="Male" value="key0" />
                            <Picker.Item label="Female" value="key1" />

                        </Picker>


                        <TextInput
                            placeholder={edit.url === null ? 'url' : edit.url}
                            value={this.state.url}
                            style={styles.textInputBorder}
                            onChangeText={(url) => this.setState({ url })}
                            underlineColorAndroid="transparent"
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                            <Text style={styles.textInputFont}>Business Account ?</Text>
                            <Switch
                                onValueChange={(value) => this.setState({ acct: value })}
                                style={{}}
                                value={this.state.acct}
                                activeText={'On'}
                                inActiveText={'Off'}
                                backgroundActive={'#000'}
                            />
                        </View>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this.editProfile}>
                            <View style={{ height: 40, width: '40%', borderWidth: 1, alignContent: 'center' }}>
                                <Text style={{ textAlign: 'center', padding: 10, fontFamily: 'Lato-Bold', color: '#000' }}>Save Changes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileHeader: {
        flex: 2,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5
    },
    textInput: {
        flex: 5,
        backgroundColor: 'white',
        padding: 20,
    },
    button: {
        flex: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 10,
        alignContent: 'center'
    },
    textInputFont: {
        fontFamily: 'Lato-Bold',
        color: '#000',
    },

    textInputBorder: {
        borderBottomWidth: 1,
        borderColor: '#000'
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        width: 250,
        alignItems: 'center',
        height: 250,
        backgroundColor: '#fff',
        elevation: 1
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        isConnected: state.isConnected.isConnected,
        data: state.editProfileReducer.editData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        network: (status) => dispatch(isConnected(status)),
        storedProfile: () => dispatch(fetchEditProfile()),
        newProfileData: (newData) => dispatch(fetchNewProfile(newData)),
        addPhoto: () => dispatch(addNewDp())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)