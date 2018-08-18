import {uiStartLoading, uiStopLoading} from './ui'
import {login} from './actionType'
import {REQUEST_URL, LOGIN_URL} from '../../component/Utility/local'
import{ToastAndroid, AsyncStorage} from 'react-native'
import { NavigationActions } from 'react-navigation'
// import setAsync from '../../component/Utility/setAsync';


export const login = (userDetails) => (dispatch, getState) => {
    const {isConnected} = getState();
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
                    dispatch(NavigationActions.navigate({ routeName: 'SignUp' }))
                    console.log('succes')
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
        userId: userId
    };
}

export const authGetToken = () => (dispatch, getState)=> {
    const Promise = new Promise ((resolve, reject) => {
        const token = getState().auth.token;
        const userId = getState().aut.token 
    })
}