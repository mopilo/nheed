import React from 'react'
import { addNavigationHelpers, createStackNavigator } from 'react-navigation'
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import SignIn from '../../src/auth/SignIn'
import SignUp from '../../src/auth/SignUp'
import OTP from '../../src/auth/OTP'
import Home from '../../src/tabs/Home'
import EditProfile from '../../src/profile/EditProfile'

export const AppNavigator = createStackNavigator({
    SignIn:{
      screen: SignIn
    },  
    SignUp: {screen:SignUp},
    OTP: {screen:OTP},
    Home: {screen: Home},
    EditProfile: { screen: EditProfile }
    },
  );

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const navigationMiddleware = createReactNavigationReduxMiddleware("root", state => state.nav)

const AppWithNavigationState = reduxifyNavigator(AppNavigator, 'root');


const mapStateToProps = state => ({
  state: state.nav,
});
const Navigator = connect(mapStateToProps)(AppWithNavigationState);


export {Navigator};