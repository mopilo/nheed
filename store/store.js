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
import {combineReducers} from 'redux'



const initialState = {};

const config = {
  key: "primary",
  storage,
};

// const config1 = {
//   key: 'batch',
//   storage
// }

// const AuthReducer = persistReducer(config, homeReducer);
const HomeReducer = persistReducer(config, homeReducer)

const rootReducer = combineReducers({
  authReducer,
  HomeReducer,
  isConnected,
  nav: navigationReducer,
  ui
})

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

export const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk, navigationMiddleware)));
export const persistor = persistStore(store)
