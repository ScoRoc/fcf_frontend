// import { Dimensions } from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
// import EStyleSheet from 'react-native-extended-stylesheet';

import IAPScreen from '../screens/IAPScreen';
import WebViewScreen from '../screens/webview/WebViewScreen';

import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import LoadingScreen from '../screens/auth/LoadingScreen';
import HomeScreen from '../screens/home/HomeScreen';
import BlogScreen from '../screens/blog/BlogScreen';
import WodScreen from '../screens/wod/WodScreen';
import WodToolsScreen from '../screens/wod-tools/WodToolsScreen';
import UnitConverterScreen from '../screens/wod-tools/unit-converter/UnitConverterScreen';
import PercentTableScreen from '../screens/wod-tools/percent-table/PercentTableScreen';

import Logout from '../screens/auth/Logout';

import {
  blackBG,
  greyDark,
  greyMedium,
  greyMediumDark,
  tabHeight,
  white,
  yellow,
} from '../../variables/style-sheet';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    WebView: WebViewScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: greyDark,
      },
      headerTintColor: white,
      headerTintStyle: {
        fontWeight: 'bold'
      }
    },
  }
);

const BlogStack = createStackNavigator(
  {
    Blog: BlogScreen,
    WebView: WebViewScreen,
  },
  {
    initialRouteName: 'Blog',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: greyDark,
      },
      headerTintColor: white,
      headerTintStyle: {
        fontWeight: 'bold'
      }
    },
  }
);

const WodToolsStack = createStackNavigator(
  {
    WodTools: WodToolsScreen,
    UnitConverter: UnitConverterScreen,
    PercentTable: PercentTableScreen,
  },
  {
    initialRouteName: 'WodTools',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: greyDark,
      },
      headerTintColor: white,
      headerTintStyle: {
        fontWeight: 'bold'
      }
    },
  }
);

const TabNav = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Blog: { screen: BlogStack },
    Wod: { screen: WodScreen },
    WodTools: { screen: WodToolsStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // stuff here
    }),
    initialRouteName: 'Home', //////////// FIX THIS
    tabBarOptions: {
      activeTintColor: white,
      inactiveTintColor: greyMedium,
      activeBackgroundColor: greyMediumDark,
      // activeBackgroundColor: blackBG,
      inactiveBackgroundColor: blackBG,
      style: {
        height: tabHeight,
      },
      tabStyle: {
        // paddingBottom: 35
      },
      labelStyle: {
        paddingBottom: 31,
        fontSize: 15
      },
      safeAreaInset: {
        bottom: 'never'
      },
    },
  },
);

const ModalStack = createStackNavigator(
  {
    Logout: { screen: Logout },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    // transparentCard: true,
    // cardStyle: {
    //   backgroundColor: 'transparent',
    //   opacity: 1,
    // },
    // transitionConfig: () => ({
    //   containerStyle: {
    //     backgroundColor: 'transparent',
    //   },
    // }),
  }
);

const MainDrawer = createDrawerNavigator(
  {
    Tabs: TabNav,
    IPP: IAPScreen,
    // Schedule: Schedule, // MAKE THESE COMPONENTS
    // MyProfile: MyProfile, // MAKE THESE COMPONENTS
    // ContactUs: ContactUs, // MAKE THESE COMPONENTS
    Logout: ModalStack, // FINISH THIS COMPONENTS
  },
  {
    // transparentCard: true,
    // cardStyle: {
    //   backgroundColor: 'transparent',
    //   opacity: 1,
    // },
    // drawerWidth: 250,
    drawerPosition: 'right',
    drawerBackgroundColor: '#411',
    contentOptions: {
      activeTintColor: 'yellow',
      inactiveTintColor: '#aaa',
      activeBackgroundColor: '#622',
      inactiveBackgroundColor: '#311'
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppSwitch = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Auth: AuthStack,
    Main: MainDrawer
  },
  {
    initialRouteName: 'Loading'
  }
)

export default AppContainer = createAppContainer(AppSwitch);
