import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    KeyboardAvoidingView, 
    TouchableOpacity,
    ToastAndroid,
    NetInfo
} from 'react-native';
import {connect} from 'react-redux';
import {registerUser} from '../../store/Actions/index'
import DefaultInput from '../../component/UI/DefaultInput'
import validate from '../../component/Utility/validation'
// CHECK THE PUSH FROM 8TH MAY

class SignUp extends Component {

    state = {
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
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: "password"
                },
                touched: false
            }
        }
    }


    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
    }
    
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
    }

    _handleConnectionChange = (isConnected) => {
        this.props.network({status: isConnected})
        // dispatch(isConnected({ status: isConnected }));
    };

    signUp = () => {

        const authReg = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
            confirm: this.state.controls.confirmPassword.value
        }
        this.props.onReg(authReg);
    }
    //Validate input
    updateInputState = (key, value) => {
        //comparing the confirm password with password, the key represents email, password etc
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            //getting the value of equalTo
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === "password") {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === "password"
                                ? validate(
                                    prevState.controls.confirmPassword.value,
                                    prevState.controls.confirmPassword.validationRules,
                                    connectedValue
                                )
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    }
                }
            };
        });
    };

    render() {
        // navigating from one screen to another
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;


        return (
            this.props.isLoading ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator animating={true} size="small" color="#000" />
            </View>
            :
            <KeyboardAvoidingView style={styles.container} behavior = 'position' keyboardVerticalOffset={-100}>
                <View style={styles.logo}>
                    <Image
                        source={require('../../assets/images/nheed.png')}
                        resizeMode='center'
                        style={{ width: 100 }}
                    />
                </View>

                {/* view for user image */}
                <View style={styles.contact}>
                    <Image source={require('../../assets/images/user.png')}
                        style={{ height: 120, width: 120, margin: 'auto', position: 'absolute', borderRadius: 90, zIndex: 123445 }} />
                </View>

                <View style={styles.textCard}>
                    <TouchableOpacity onPress={this.signUp} style={styles.button}>
                        <Text style={styles.btnText}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.shape}>
                    <DefaultInput
                        placeholder='Enter your mail'
                        autoCorrect={false}
                        autoFocus={false}
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
                        value={this.state.controls.password.value}
                        onChangeText={val => this.updateInputState("password", val)}
                        valid={this.state.controls.password.valid}
                        touched={this.state.controls.password.touched}
                    />
                    <DefaultInput
                        placeholder='Re-enter your password'
                        autoCorrect={false}
                        autoFocus={false}
                        keyboardType='default'
                        secureTextEntry={true}
                        style={styles.textInput}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={val => this.updateInputState("confirmPassword", val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                    />
                </View>

                <View style={styles.skewShape} />


                <View style={styles.innerShape} />


                <Text style={styles.signIn} onPress={() => goBack()}> SIGN IN</Text>

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
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        alignSelf: 'center',
    },

    shape: {
        top: 300,
        height: 250,// increased the width from 200 to 250
        width: 300,
        padding: 30,
        position: 'absolute',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    innerShape: {
        top: 300,
        height: 260,
        width: 250,
        backgroundColor: '#f0f0f0',
        position: 'absolute',
        zIndex: -2,
        alignSelf: 'center',
    },

    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Lato-Bold',
        
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 30,
        width: 120,
        padding: 13
    },
    textCard: {
        top: 520,
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
        textAlign: 'center',
        fontFamily: 'Lato-Light'
    },
    signIn: {
        color: 'black',
        fontSize: 16,
        top: 590,
        position: 'absolute',
        fontFamily: 'Lato-Bold',
        fontSize: 12,
        alignSelf: 'center',
    },
    contact: {
        height: 120,
        width: 120,
        borderRadius: 100,
        backgroundColor: '#e5e3e3', // e5e3e3
        position: 'absolute',
        top: 180,
        zIndex: 10000,
        alignContent: 'flex-end',
        borderColor: 'transparent',
        alignSelf: 'center',
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
        onReg: (authReg) => dispatch(registerUser(authReg)),
        network: (status) => dispatch(isConnected(status))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

