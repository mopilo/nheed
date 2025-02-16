import {uiStartLoading, uiStopLoading} from './ui'
import { EXPLORED, LIST_POST } from './actionType'
import {REQUEST_URL, HOME_URL, EXPLORE, HOME_URL_LAST } from '../../component/Utility/local'
import{ToastAndroid} from 'react-native'
import { NavigationActions } from 'react-navigation';


export const fetchExplore = () => (dispatch, getState) => {
    const {token} = getState().authReducer
    const {userId} = getState().authReducer
    const {isConnected} = getState().isConnected 

    const url = REQUEST_URL + HOME_URL + userId + EXPLORE;

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
        .then((res) => { return res.json() })
        .then((resData) => {
            dispatch(uiStopLoading());
            if(resData.message){
                ToastAndroid.showWithGravity(
                    resData.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );    
            }
            else{
                dispatch(
                    exploreAsync(
                        resData.data
                    )
                )
            }
            return resData
        })
        .catch((err) => {
            dispatch(uiStopLoading());
            ToastAndroid.showWithGravity(
                err,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );        
        })
    }
}

export const exploreAsync = (item) => {
    return {
        type: EXPLORED,
        explore: item
    }
}

export const fetchListPost = (item) => (dispatch, getState) => {
    const {token} = getState().authReducer
    const {userId} = getState().authReducer

    const url = REQUEST_URL + HOME_URL + userId + EXPLORE;
    let play;
    let exa;

    if(token){
        fetch(url, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => { return res.json() })
        .then((resData) => {
            if (resData.message) {
                ToastAndroid.showWithGravity(
                    resData.message,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
            }
            else{
                play = resData.data;
                exa = play.find((e) => {return e.id === item});
                dispatch(
                    listAsync(
                        exa
                    )
                )
                dispatch(NavigationActions.navigate({ routeName: 'ListPost' }))
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

export const listAsync = (item) => {
    return {
        type: LIST_POST,
        list: item
    }
}