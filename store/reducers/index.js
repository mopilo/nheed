import {combineReducers} from 'redux';
import authReducer from './authReducer'
import ui from './ui'
import isConnected from './isConnected'
import navigationReducer from './navigation'
import homeReducer from './homeReducer'

export default combineReducers({
    authReducer,
    ui,
    homeReducer,
    isConnected,
    nav: navigationReducer
})