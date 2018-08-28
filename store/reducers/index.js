import {combineReducers} from 'redux';
import authReducer from './authReducer'
import ui from './ui'
import isConnected from './isConnected'
import navigationReducer from './navigation'
import homeReducer from './homeReducer'
import editProfileReducer from './editProfileReducer'

export default combineReducers({
    authReducer,
    ui,
    homeReducer,
    isConnected,
    editProfileReducer,
    nav: navigationReducer
})