import {uiStartLoading, uiStopLoading} from './ui'
import {HOME_SUCCESS} from './actionType'
import {REQUEST_URL, HOME_URL, HOME_URL_LAST} from '../../component/Utility/local'
import{ToastAndroid, AsyncStorage} from 'react-native'
import { NavigationActions } from 'react-navigation';

export const fetchHomeRequest = () => (dispatch, getState) => {
    const { userId, token} = getState().AuthReducer;
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
                // let play = resData.data;
                // const totalMedia = play.filter(media => media.id === userId);
                // let text = resData.data
                // let result = text.map(word => { return word.liked })

                // this.setState({
                //     likedddd: result,
                //     token: token,
                //     userId: userId,
                //     data: resData.data,
                //     isLoading: false,
                //     refresh: false,
                //     newMedia: Object.keys(totalMedia).length
                // })


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
    else {
        dispatch(NavigationActions.navigate({ routeName: 'SignIn' }))
    }
}

export const setAsync = (data) => {
    return{
        type: HOME_SUCCESS,
        data: data
    }
}
