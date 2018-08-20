import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Navigator} from './component/Navigator/AppNavigation'
import {store, persistor} from './store/store'
import { PersistGate } from "redux-persist/es/integration/react";



export default class App extends Component{
  render(){
    return(
      <Provider store ={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator/>
        </PersistGate>
      </Provider>
    )
  }
}

