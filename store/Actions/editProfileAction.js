import {uiStartLoading, uiStopLoading} from './ui'
import {FETCH_EDIT_PROFILE} from './actionType'
import {REQUEST_URL, HOME_URL} from '../../component/Utility/local'
import{ToastAndroid} from 'react-native'
import { NavigationActions } from 'react-navigation';



export const fetchEditProfile = () => (dispatch, getState) => {
    const {token} = getState().authReducer;
    const {userId} = getState().authReducer
    const {isConnected} = getState().isConnected

    const url = REQUEST_URL + HOME_URL + userId;

    if(!isConnected){
        ToastAndroid.showWithGravity(
            "Field can't be empty",
            ToastAndroid.SHORT,               
            ToastAndroid.CENTER
        );
    }
    if(token){
        fetch(url, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => { return res.json() })
        .then((resData) => {
            if(resData.message){
                ToastAndroid.showWithGravity(
                    resData.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );    
            }
            else{
                dispatch(
                    editAsync(
                        resData.data,
                    )
                )
            }
            return resData
        })
        .catch((err) => {
            ToastAndroid.showWithGravity(
                err,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );        
        })
    }
}


export const editAsync = (item) => {
    return {
        type: FETCH_EDIT_PROFILE,
        edit: item,
    }
}


export const fetchNewProfile = (newData) => (dispatch, getState) => {
    const {token} = getState().authReducer;
    const {userId} = getState().authReducer
    const url = REQUEST_URL + HOME_URL + userId;


    if(!isConnected){
        ToastAndroid.showWithGravity(
            "Field can't be empty",
            ToastAndroid.SHORT,               
            ToastAndroid.CENTER
        );
    }
    if(token){
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                account: {
                    name: newData.name,
                    phone: newData.phone,
                    email: newData.email,
                    address: newData.address,
                    bio: newData.bio,
                    url: newData.url,
                    acct: newData.acct
                }
            })
        })
        .then((res) => { return res.json() })
        .then((resData) => {
            if(resData.error){
                ToastAndroid.showWithGravity(
                    resData.error,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );    
            }
            else{
                dispatch(
                    editAsync(
                        resData.data,
                    )
                )
                dispatch(NavigationActions.navigate({routeName: 'Home'}))
            }
            return resData
        })
        .catch((err) => {
            ToastAndroid.showWithGravity(
                err,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );        
        })
    }
}