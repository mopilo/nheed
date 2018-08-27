import {uiStartLoading, uiStopLoading} from './ui'
import {HOME_SUCCESS, PROFILE, MY_PROFILE, GRID_POST} from './actionType'
import {REQUEST_URL, HOME_URL, HOME_URL_LAST, HOME_POST} from '../../component/Utility/local'
import{ToastAndroid, AsyncStorage} from 'react-native'
import { NavigationActions } from 'react-navigation';


export const fetchHomeRequest = () => (dispatch, getState) => {
    const { userId, token} = getState().authReducer;
    const {isConnected} = getState().isConnected

    

    const url = REQUEST_URL + HOME_URL + userId + HOME_URL_LAST;
    if(!isConnected){
        ToastAndroid.showWithGravity(
            "Field can't be empty",
            ToastAndroid.SHORT,               
            ToastAndroid.CENTER
        );
    }
    if(token){
        dispatch(uiStartLoading());
        fetch(url, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => { return res.json() })
        .then((resData) => {
            dispatch(uiStopLoading());
            if (resData.message) {
                ToastAndroid.showWithGravity(
                    resData.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
            else {
                dispatch(
                    setAsync(
                        resData.data,
                    )
                );
            }
            return resData;
        })
        .catch((error) => {
                this.setState = ({
                    isLoading: false
                })
                console.log(error)
        })
    }
    // else {
    //     dispatch(NavigationActions.navigate({ routeName: 'SignIn' }))
    // }
}

export const setAsync = (data) => {
    return{
        type: HOME_SUCCESS,
        data: data
    }
}

export const fetchProfile = () => (dispatch, getState) => {
    const {userId, token} = getState().authReducer;
    const url = REQUEST_URL + HOME_URL + userId;

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
            dispatch(
                profileAsync(
                    resData.data,
                    resData.data.profile_picture
                )
            )
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

export const profileAsync = (profile, pic) => {
    return{
        type: PROFILE,
        profileData: profile,
        pic: pic
    }
}

export const fetchMyProfile = (item) => (dispatch, getState) => {
    const {token} = getState().authReducer;
    const url = REQUEST_URL + HOME_URL + item;
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
            dispatch(
                userAsync(
                    resData.data,
                    resData.data.phone
                )
            )
            dispatch(NavigationActions.navigate({ routeName: 'ViewProfile' }))
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

export const userAsync = (item, phone) => {
    return {
        type: MY_PROFILE,
        user: item,
        phone: phone
    }
}

export const fetchPostDetails = (user) => (dispatch, getState) => {
    const {token} = getState().authReducer;
    const url = REQUEST_URL + HOME_URL + user + HOME_POST;
    if(token){
        fetch(url, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => { return res.json()})
        .then((resData) => {
            if (resData.message) {
                ToastAndroid.showWithGravity(
                    resData.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );             }
            else {
                dispatch(
                    detailAsync(
                        resData.data,
                    )
                )
                dispatch(NavigationActions.navigate({ routeName: 'GridPage' }))
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
export default detailAsync = (user) => {
    return {
        type: GRID_POST,
        user: user
    }
}