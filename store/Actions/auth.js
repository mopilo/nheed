import {uiStartLoading, uiStopLoading} from './ui'
import {login, register} from './actionType'
import {REQUEST_URL, LOGIN_URL, SIGN_UP, OTP} from '../../component/Utility/local'
import{ToastAndroid, AsyncStorage} from 'react-native'
import { NavigationActions } from 'react-navigation'
// import setAsync from '../../component/Utility/setAsync';

//login
export const loginUser = (userDetails) => (dispatch, getState) => {
    const {isConnected} = getState().isConnected
    const signinURL = REQUEST_URL + LOGIN_URL;

    if (userDetails.email.trim() === '' || userDetails.password.trim() === '') {
        ToastAndroid.showWithGravity(
            "Field can't be empty",
            ToastAndroid.SHORT,               
            ToastAndroid.CENTER
        );
    }
    if(userDetails.email && userDetails.password){
        if(!isConnected){
            ToastAndroid.showWithGravity(
                "Device offline",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        
        else{
            dispatch(uiStartLoading());

            fetch(signinURL, {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        email: userDetails.email,
                        password: userDetails.password
                    }
                }),
                headers: {
                    "Content-Type": "application/json",
                  'Accept': 'application/json'
    
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
            })
            .then(res => {return res.json()})
            .then(resData => {
                dispatch(uiStopLoading());
                if (resData.error) {
                    ToastAndroid.showWithGravity
                    (resData.error, ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
                else if(resData.message){
                    ToastAndroid.showWithGravity(resData.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
                else {
                    dispatch(
                        setAsync(
                            resData.token,
                            resData.data.id.toString()
                        )
                    );
                    dispatch(NavigationActions.navigate({ routeName: 'Home' }))
                }
            });
        
        }
    }  
}

export const setAsync = (token, userId) => dispatch=>{
    //dispatch to store
    dispatch(authSetTokenUserId(token, userId));
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('id', userId)
}

export const authSetTokenUserId= (token, userId)=>{
    return{
        type: login,
        token: token,
        userId: userId,
        loggedIn: true
    };
}

//Register

export const registerUser = (userDetails) => (dispatch, getState) => {
    const {isConnected} = getState();
    const signinURL = REQUEST_URL + SIGN_UP;

    if (userDetails.email.trim() === '' || userDetails.password.trim() === '' || userDetails.confirm.trim() === '') {
        ToastAndroid.showWithGravity(
            "Field can't be empty",
            ToastAndroid.SHORT,               
            ToastAndroid.CENTER
        );
    }
    if (userDetails.password != userDetails.confirm){
        ToastAndroid.showWithGravity(
            "password mismatch",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    if(userDetails.email && userDetails.password){
        if(!isConnected){
            ToastAndroid.showWithGravity(
                "Device offline",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        
        else{
            dispatch(uiStartLoading());

            fetch(signinURL, {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        email: userDetails.email,
                        password: userDetails.password
                    }
                }),
                headers: {
                    "Content-Type": "application/json",
                  'Accept': 'application/json'
    
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
            })
            .then(res => {return res.json()})
            .then(resData => {
                dispatch(uiStopLoading());
                if (resData.error) {
                    ToastAndroid.showWithGravity
                    (resData.error, ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
                else if(resData.message){
                    ToastAndroid.showWithGravity(resData.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
                else {
                    ToastAndroid.showWithGravity(
                        'Authenticating',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    )
                    dispatch(
                        setEmail(
                            resData.data.email
                        )
                    );
                    dispatch(NavigationActions.navigate({ routeName: 'OTP' }))
                }
            });
        
        }
    }  
}

export const setEmail = (email) => dispatch=>{
    //dispatch to store
    dispatch(authSetEmailUser(email));
    AsyncStorage.setItem('email', email);
}

export const authSetEmailUser= (email)=>{
    return{
        type: register,
        email: email
    };
}

//otp

export const registerOTP = (userDetails) => (dispatch, getState) => {
    const {isConnected} = getState();
    const signinURL = REQUEST_URL + OTP;

    if (userDetails.otp.trim() === '' ) {
        ToastAndroid.showWithGravity(
            "Field can't be empty",
            ToastAndroid.SHORT,               
            ToastAndroid.CENTER
        );
    }
    if (userDetails.otp < 5){
        ToastAndroid.showWithGravity(
            "Incomplete",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
    }

    if(userDetails.otp){
        if(!isConnected){
            ToastAndroid.showWithGravity(
                "Device offline",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
        
        else{
            dispatch(uiStartLoading());

            fetch(signinURL, {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        email: userDetails.email,
                        otp: userDetails.otp
                    }
                }),
                headers: {
                    "Content-Type": "application/json",
                  'Accept': 'application/json'
    
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
            })
            .then(res => {return res.json()})
            .then(resData => {
                dispatch(uiStopLoading());
                if (resData.error) {
                    ToastAndroid.showWithGravity
                    (resData.error, ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
                else if(resData.message){
                    ToastAndroid.showWithGravity(resData.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
                else {
                    ToastAndroid.showWithGravity(
                        'Authenticating',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    )
                    dispatch(
                        setAsync(
                            resData.token,
                            resData.data.id.toString()                        )
                    );
                    dispatch(NavigationActions.navigate({ routeName: 'EditProfile' }))
                }
            });
        
        }
    }  
}


export const authAutoSignIn = () => (dispatch, getState)=>{
    const {token} = getState().AuthReducer
    if(token){
        dispatch(NavigationActions.navigate({ routeName: 'Home' }))
    }
    else{
        dispatch(NavigationActions.navigate({ routeName: 'SingIn' }))
    }
}

