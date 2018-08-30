import {uiStartLoading, uiStopLoading} from './ui'
import {FETCH_EDIT_PROFILE, ADD_PHOTO} from './actionType'
import {REQUEST_URL, HOME_URL, PICTURE} from '../../component/Utility/local'
import{ToastAndroid} from 'react-native'
import { NavigationActions } from 'react-navigation';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker'



export const fetchEditProfile = () => (dispatch, getState) => {
    const {token} = getState().AuthReducer;
    const {userId} = getState().AuthReducer
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
    const {isConnected} = getState().isConnected
    const {token} = getState().AuthReducer;
    const {userId} = getState().AuthReducer
    
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

export const addNewDp = () => (dispatch, getState) => {
    const {isConnected} = getState().isConnected
    const {token} = getState().AuthReducer;
    const {userId} = getState().AuthReducer

    const options = {
        title: 'Select Image',
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
            skipBackup: true
        }
    };

    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled photo picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let image = { uri: response.uri }
            let profile_image = response.path
            dispatch(
                profileDp(
                    image,
                    profile_image
                )
            )

            const url = REQUEST_URL + HOME_URL + userId + PICTURE;
            if (token) {
                RNFetchBlob.fetch('PUT', url, {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }, 
                [
                    // custom content type
                    { name: 'media', filename: 'avatar-png.jpg', type: 'image/jpg', data: RNFetchBlob.wrap(profile_image) }
                ])
                .then((res) => { return res.json() })
                .then((resData) => {
                    if (resData.error) {
                        ToastAndroid.showWithGravity(
                            resData.error,
                            ToastAndroid.LONG,
                            ToastAndroid.CENTER
                        );
                    }
                    else {
                        console.log(resData)
                    }
                    return resData;
                })
                .catch(() => {
                    ToastAndroid.showWithGravity(
                        'Error update profile picture',
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                })
            }
        }
    });
}

export const profileDp = (pic, dp) => {
    return{
        type: ADD_PHOTO,
        pic: pic,
        dp:dp
    }
}