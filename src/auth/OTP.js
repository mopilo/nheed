import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    AsyncStorage,
    KeyboardAvoidingView,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    NetInfo,
    ActivityIndicator
} from 'react-native';
import DefaultInput from '../../component/UI/DefaultInput';
import { OTP, REQUEST_URL } from '../../component/Utility/local';
import {connect} from 'react-redux'
import {registerOTP} from '../../store/Actions/index'
// import setAsync from '../Utility/setAsync';


class SignInOTP extends Component {
    state = {
        otp: '',
        authToken: '',
        isLoading: false,
        email: ''
    }

    //taking away nav header                
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        // AsyncStorage.getItem('email').then((email)=>{
        //     if(email != null){
        //         this.setState({
        //             email: email
        //         })
        //     }
        // })
        // const email = this.props.email;
        // this.setState({email})
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (isConnected) => {
        this.props.network({status: isConnected})
    };

    signIn = () => {
        const authOTP = {
            email: this.props.email,
            otp: this.state.otp
        }
        this.props.otp(authOTP)
    }

    

    render() {
        // navigating from one screen to another
        const { navigate } = this.props.navigation;

        return (
            this.props.isLoading
             ? 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} size="small" color="#000" />
            </View>              
            :
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-200} style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        source={require('../../assets/images/nheed.png')}
                        resizeMode='center'
                        style={{ width: 100 }}
                    />
                </View>
                <View style={styles.textCard}>
                    <TouchableOpacity onPress={this.signIn} style={styles.button}>
                        <Text style={styles.btnText}>
                            VERIFY
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.shape}>
                        <DefaultInput
                            placeholder='Enter your OTP here'
                            autoCorrect={false}
                            autoFocus={false}
                            keyboardType='numeric'
                            style={styles.textInput}
                            onChangeText={(otp) => this.setState({ otp })}
                        />

                    </View>
                </TouchableWithoutFeedback>

                {/* view for shapes */}
                <View style={styles.skewShape} />
                <View style={styles.innerShape} />

            </KeyboardAvoidingView>
        );
    }

};


// styliing

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e3e3',
        alignItems: 'center',
        position: 'relative'
    },


    logo: {
        top: -180,
        alignSelf: 'center',
        position: 'absolute',
        alignSelf: 'center',

    },
    skewShape: {
        top: 200,
        height: 0,
        width: 0,
        borderBottomWidth: 100,
        borderLeftWidth: 300,
        borderLeftColor: '#e5e3e3',
        borderBottomColor: 'white',
        position: 'absolute',
        backgroundColor: 'red',
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        elevation: 0.1,
        alignSelf: 'center',
    },

    shape: {
        top: 300,
        height: 200,
        width: 300,
        padding: 30,
        position: 'absolute',
        backgroundColor: 'white',
        elevation: 0.1,
        alignSelf: 'center',
    },
    innerShape: {
        top: 250,
        height: 260,
        width: 250,
        backgroundColor: '#f0f0f0',
        position: 'absolute',
        zIndex: -2,
        elevation: 0.1,
        alignSelf: 'center',
    },

    btnText: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: 16,
        width: 120,
        textAlign: 'center',
        alignSelf: 'center',
        height: 50,
        borderRadius: 30,
        padding: 15,
        fontWeight: 'bold',
        marginTop: 250,
        zIndex: 1000
    },
    textCard: {
        top: 480,
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 99,
        borderColor: 0,
        width: 120,
        borderRadius: 30,
        elevation: 0.1,
        alignSelf: 'center',
    },

    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Lato-Bold'
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 30,
        width: 120,
        padding: 13
    },

    textCard: {
        top: 480,
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 99,
        borderColor: 0,
        width: 120,
        borderRadius: 30,
        elevation: 0.1,
        alignSelf: 'center',
    },

    textInput: {
        textAlign: 'center'
    }
});

const mapStateToProps = state => {
    return {
      isLoading: state.ui.isLoading,
      isConnected: state.isConnected.isConnected,
      email: state.authReducer.email
    };
};

const mapDispatchToProps = dispatch => {
    return {
        otp: (authOTP) => dispatch(registerOTP(authOTP)),
        network: (status) => dispatch(isConnected(status))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SignInOTP);
