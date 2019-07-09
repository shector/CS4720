import { createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Home from './Screens/Home';
import Splash from './Screens/Splash';
import InviteDetail from './Screens/InviteDetail'
import LoginScreen from './Screens/Login'
import NewEvent from './Screens/newEvent'
import InviteOthers from './Screens/InviteOthers'

export default createStackNavigator(
  { // Screens
    Home: {
      screen: Home,
    },
    Splash: {
      screen: Splash,
    },
    InviteDetail: {
      screen: InviteDetail,
    },
    LoginScreen: {
      screen: LoginScreen
    },
    NewEvent: {
      screen: NewEvent
    },
    InviteOthers: {
      screen: InviteOthers
    }
  },
  { // Options 
    initialRouteName: 'Home', // Temporary Rememeber to set to Splash
    headerMode: 'none',
    navigationOptions: { headerVisible: false, }
  });