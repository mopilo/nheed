import {combineReducers} from 'redux';
import authReducer from './authReducer'
import ui from './ui'
import isConnected from './isConnected'
import navigationReducer from './navigation'

export default combineReducers({
    auth: authReducer,
    ui: ui,
    isConnected: isConnected,
    nav: navigationReducer
})