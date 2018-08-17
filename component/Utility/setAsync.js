import {AsyncStorage} from 'react-native';

const setAsync = (resData) => {
    return AsyncStorage.multiSet([
        ['token', resData.token], 
        ['userId', resData.data.id.toString()]
    ]);
}


export default setAsync;
