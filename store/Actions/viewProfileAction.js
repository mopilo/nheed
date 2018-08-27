import {uiStartLoading, uiStopLoading} from './ui'
import {FETCH_VIEW_PROFILE} from './actionType'
import {REQUEST_URL, HOME_URL} from '../../component/Utility/local'
import{ToastAndroid} from 'react-native'
import { NavigationActions } from 'react-navigation';



export const fetchViewProfile = () => (dispatch, getState) => {
    const {token} = getState().authReducer;
    const {id} = getState().homeReducer
    const url = REQUEST_URL + HOME_URL + id;


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
            dispatch(
                viewAsync(
                    resData.data,
                    resData.data.phone
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


export const viewAsync = (item, phone) => {
    return {
        type: FETCH_VIEW_PROFILE,
        view: item,
        phone: phone
    }
}

