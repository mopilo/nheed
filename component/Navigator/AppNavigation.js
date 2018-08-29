import React from 'react'
import { addNavigationHelpers, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import {View} from 'react-native'

//auth
import SignIn from '../../src/auth/SignIn'
import SignUp from '../../src/auth/SignUp'
import OTP from '../../src/auth/OTP'

//tabs
import Home from '../../src/tabs/Home'
import Upload from '../../src/tabs/Upload'
import Explore from '../../src/tabs/Explore'

//other screens
import GridPage from '../../src/screen/GridPage'

//profile
import EditProfile from '../../src/profile/EditProfile'
import ViewProfile from '../../src/profile/ViewProfile'
import MyProfile from '../../src/profile/MyProfile'

//icons
import Icon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'

  const HomeTabNav = createStackNavigator({
    Home: {screen: Home},
    EditProfile: { screen: EditProfile },
    GridPage: {screen: GridPage},
    ViewProfile: {screen: ViewProfile},
    MyProfile: {screen: MyProfile}
  },{
    initialRouteName: 'Home',
  })

  const UploadTabNav = createStackNavigator({
    Upload: {screen: Upload}
  })
  const ExploreTabNav = createStackNavigator({
    Explore: {screen: Explore}
  })

  const AppTab = createBottomTabNavigator({
    HomeTab: {
      screen: HomeTabNav
    },
    UploadTab: {
      screen: UploadTabNav
    },
    ExploreTab: {
      screen: ExploreTabNav
    },
  },{
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let home;
        if (routeName === 'HomeTab') {
          home = 'home-outline';
          // tabBarIcon: return ( <Image source={require('./assets/assets/nheed.png')} style={{ width: 33, height: 33 }} color={tintColor} />)
        } else if (routeName === 'UploadTab') {
          iconName = 'arrow-up';
        }
        else if (routeName === 'ExploreTab'){
          iconName = 'search'
        }
  
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <Icon name={iconName} size={25} color={tintColor} />
            <MIcon name= {home} size={25} color={tintColor}/>
          </View>
  
        )
      },
      // tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
      //   resetStack(navigation, previousScene.routes);
      //   jumpToIndex(scene.index);
      // }
    }),
      swipeEnabled: false,
      tabBarOptions: {
          inactiveTintColor: 'grey',
          activeTintColor: '#000',
          showIcon: true,
          showLabel: false,
          scrollEnabled: false,
          animationEnabled: false,
          renderIndicator: () => null,
          labelStyle: {
            fontSize: 12,
          },
          style: {
            backgroundColor: '#ffffff',
          },
        }
  })


  export const AppNavigator = createSwitchNavigator({
    SignIn:{
      screen: SignIn
    },  
    SignUp: {screen:SignUp},
    OTP: {screen:OTP},
    AppTab: {screen: AppTab}
    // Home: {screen: Home},
    // EditProfile: { screen: EditProfile },
    // GridPage: {screen: GridPage},
    // ViewProfile: {screen: ViewProfile},
    // MyProfile: {screen: MyProfile}
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