import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import {navigationMiddleware} from '../component/Navigator/AppNavigation'

const initialState = {};

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk, navigationMiddleware)));
export default store;
