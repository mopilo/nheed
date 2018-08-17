import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Navigator} from './component/Navigator/AppNavigation'
import store from './store/store'


export default class App extends Component{
  render(){
    return(
      <Provider store ={store}>
        <Navigator/>
      </Provider>
    )
  }
}

