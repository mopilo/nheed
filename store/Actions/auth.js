import {uiStartLoading, uiStopLoading} from './ui'
import {} from './actionType'
import {REQUEST_URL, LOGIN_URL} from '../../component/Utility/local'
import{ToastAndroid} from 'react-native'
import { NavigationActions } from 'react-navigation'
import setAsync from '../../component/Utility/setAsync';


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
                      setAsync(resData);
                      dispatch(NavigationActions.navigate({ routeName: 'SignUp' }))
                      console.log('succes')
                    }
                  });
        
            }
        }
        
        
        
    
   
}

