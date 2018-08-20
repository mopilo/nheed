import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './reducers'
import {navigationMiddleware} from '../component/Navigator/AppNavigation'
import {
  persistCombineReducers,
  persistStore,
  persistReducer
} from "redux-persist";
import storage from "redux-persist/es/storage";
import authReducer from './reducers/authReducer'
import isConnected from './reducers/isConnected'
import navigationReducer from './reducers/navigation'
import ui from './reducers/ui'
import {combineReducers} from 'redux'



const initialState = {};

const config = {
  key: "root",
  storage,
};

const AuthReducer = persistReducer(config, authReducer);

const rootReducer = combineReducers({
  AuthReducer,
  isConnected,
  nav: navigationReducer,
  ui
})

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

export const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk, navigationMiddleware)));
export const persistor = persistStore(store)
