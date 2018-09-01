import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './reducers'
import {navigationMiddleware} from '../component/Navigator/AppNavigation'
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from './reducers/authReducer'
import isConnected from './reducers/isConnected'
import navigationReducer from './reducers/navigation'
import ui from './reducers/ui'
import homeReducer from './reducers/homeReducer'
import exploreReducer from './reducers/exploreReducer'
import editProfileReducer from './reducers/editProfileReducer'
import {combineReducers} from 'redux'
import reducer from './reducers'
import logger from 'redux-logger'


const initialState = {};

const config = {
  key: "root",
  storage,
};



// const AuthReducer = persistReducer(config, homeReducer);
const AuthReducer = persistReducer(config, authReducer)

const rootReducer = combineReducers({
  AuthReducer,
  homeReducer,
  isConnected,
  editProfileReducer,
  exploreReducer,
  nav: navigationReducer,
  ui
})

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

export const store = createStore(reducer, initialState, compose(applyMiddleware(thunk, logger, navigationMiddleware)));
export const persistor = persistStore(store)
