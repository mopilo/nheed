import {uiStartLoading, uiStopLoading} from './ui'
import {HOME_SUCCESS, PROFILE, MY_PROFILE, GRID_POST} from './actionType'
import {REQUEST_URL, HOME_URL, HOME_URL_LAST} from '../../component/Utility/local'
import{ToastAndroid, AsyncStorage} from 'react-native'
import { NavigationActions } from 'react-navigation';


export const fetchHomeRequest = () => (dispatch, getState) => {
    const { userId, token} = getState().authReducer;
    const {isConnected} = getState().isConnected

    

    const url = REQUEST_URL + HOME_URL + userId + HOME_URL_LAST;
    // if(!isConnected){
    //     ToastAndroid.showWithGravity(
    //         "Field can't be empty",
    //         ToastAndroid.SHORT,               
    //         ToastAndroid.CENTER
    //     );
    // }
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
    const { userId, token} = getState().authReducer;
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

export const profileAsync = (data, pic) => {
    return{
        type: PROFILE,
        profileData: data,
        pic: pic
    }
}

// export const fetchMyProfile = (item) => (dispatch) => {
//     dispatch(NavigationActions.navigate({ routeName: 'ViewProfile' }))
//     dispatch(userAsync(item))

// }

// export const userAsync = (item) => {
//     return {
//         type: MY_PROFILE,
//         acctId: item.toString()
//     }
// }

// export const fetchPostDetails = (user) => (dispatch) => {
//     dispatch(NavigationActions.navigate({ routeName: 'GridPage' }))
//     dispatch(detailAsync(user))
// }
// export default detailAsync = (user) => {
//     return {
//         type: GRID_POST,
//         user: user
//     }
// }