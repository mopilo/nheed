import { 
    AsyncStorage, 
    NetInfo,
    ToastAndroid
 } from 'react-native';

export const REQUEST_URL = "https://nheed.herokuapp.com";
export const LOGIN_URL = "/api/login";
export const SIGN_UP = "/api/users";
export const HOME_URL = "/api/accounts/";
export const HOME_URL_LAST = "/home";
export const HOME_POST = "/posts";
export const OTP = "/api/otp";
export const MY_POST = "/my-post";
export const PICTURE = "/picture";
export const SEARCH = "/search";
export const QUERY = "?query=";
export const EXPLORE = "/explore"



export const searchUser = (user) => {
    

    AsyncStorage.multiGet(['token', 'userId']).then(stores => {
        const token = stores[0][1];
        const userId = stores[1][1];})
        let userName = user.toLowerCase().trim();
        console.log('use ' + userName)
        const url = `https://nheed.herokuapp.com/api/accounts/11/search?query=${userName}`;
        console.log('url ' + token)
        return fetch(url).then((res) => res.json())
    
}
