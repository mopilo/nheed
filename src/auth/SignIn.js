import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ToastAndroid,
    NetInfo,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import {connect} from 'react-redux'
import DefaultInput from '../../component/UI/DefaultInput';
import validate from '../../component/Utility/validation';
import {isConnected} from  '../../store/Actions/isConnected'
import { loginUser, authAutoSignIn} from '../../store/Actions/index'


class SignIn extends Component {
    //header
    static navigationOptions = {
        header: null,
    };

    //state
    state = {
        showAlert: false,
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },

        }
    }

    componentWillMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        AsyncStorage.getItem('token').then((token)=>{
            if(token != null){
                this.props.navigation.navigate('Home')
            }
        })
        // this.props.onAutoSignIn
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (isConnected) => {
        this.props.network({status: isConnected})
    };
    

    signUp = () => {
        this.props.navigation.navigate('SignUp')
    }


    authHandler = () => {
        const authData = {
          email: this.state.controls.email.value,
          password: this.state.controls.password.value
        };
        this.props.onTryAuth(authData);
      };

    updateInputState = (key, value) => {
        //comparing the confirm password with password, the key represents email, password etc

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate( value, prevState.controls[key].validationRules ),
                        touched: true
                    }
                }
            };
        });
    };



    render() {
        return (
            this.props.isLoading ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} size="small" color="#000" />
            </View>
            :
            <KeyboardAvoidingView style={styles.container} behavior="position" keyboardVerticalOffset={-140}>
                <View style={styles.logo}>
                    <Image
                        source={require('../../assets/images/nheed.png')}
                        resizeMode='center'
                        style={{ width: 100 }}
                    />
                </View>
                <View style={styles.contact}>
                    <Image source={require('../../assets/images/user.png')}
                        style={{ height: 120, width: 120, margin: 'auto', position: 'absolute', borderRadius: 90, zIndex: 123445 }} />
                </View>
                <View style={styles.skewShape} />
                <View style={styles.innerShape} />
                <View style={styles.textCard}>
                    <TouchableOpacity onPress={this.authHandler} style={styles.button}>
                        <Text style={styles.btnText}>
                            SIGN IN
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.shape}>
                        <DefaultInput
                            placeholder='Enter your email'
                            autoCorrect={false}
                            autoFocus={false}
                            returnKeyType='next'
                            keyboardType='email-address'
                            style={styles.textInput}
                            value={this.state.controls.email.value}
                            onChangeText={val => this.updateInputState("email", val)}
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touched}
                        />
                        <DefaultInput
                            placeholder='Enter your password'
                            autoCorrect={false}
                            autoFocus={false}
                            keyboardType='default'
                            secureTextEntry={true}
                            style={styles.textInput}
                            borderBottomColor='black'
                            value={this.state.controls.password.value}
                            onChangeText={val => this.updateInputState("password", val)}
                            valid={this.state.controls.password.valid}
                            touched={this.state.controls.password.touched}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <Text style={styles.signUp} onPress={this.signUp}> SIGN UP</Text>

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
        position: 'relative',
    },
    logo: {
        position: 'absolute',
        alignSelf: 'center',
        top: -180
    },
    skewShape: {
        top: 200,
        height: 0,
        width: 0,
        borderBottomWidth: 100,
        borderLeftWidth: 300,
        borderLeftColor: 'transparent',
        borderBottomColor: 'white',
        position: 'absolute',
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        elevation: 0.1,
        alignSelf: 'center'
    },
    shape: {
        top: 300,
        height: 200,
        width: 300,
        padding: 30,
        position: 'absolute',
        backgroundColor: 'white',
        elevation: 0.1,
        alignSelf: 'center'
    },
    innerShape: {
        top: 300,
        height: 210,
        width: 250,
        backgroundColor: '#f0f0f0',
        position: 'absolute',
        zIndex: -2,
        elevation: 0.1,
        alignSelf: 'center'
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
        alignSelf: 'center'
    },
    textInput: {
        textAlign: 'center',
        fontFamily: 'Lato-Light',
        fontWeight: '400'
    },
    signUp: {
        color: 'black',
        fontSize: 13,
        top: 550,
        position: 'absolute',
        fontFamily: 'Lato-Bold',
        alignSelf: 'center'
    },
    contact: {
        height: 120,
        width: 120,
        borderRadius: 100,
        backgroundColor: '#e5e3e3', // e5e3e3
        position: 'absolute',
        top: 180,
        zIndex: 10000,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'transparent',
        elevation: 0.1,
        alignSelf: 'center'
    }
});


const mapStateToProps = state => {
    return {
      isLoading: state.ui.isLoading,
      isConnected: state.isConnected.isConnected
    };
};
  
  const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData) => dispatch(loginUser(authData)),
        onAutoSignIn: () => dispatch(authAutoSignIn()),
        network: (status) => dispatch(isConnected(status))
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
