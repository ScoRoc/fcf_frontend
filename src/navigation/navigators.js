import {
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import IAPScreen from '../screens/IAPScreen';

import HomeScreen from '../screens/home/HomeScreen';
import BlogScreen from '../screens/blog/BlogScreen';
import WodScreen from '../screens/wod/WodScreen';
import WodToolsScreen from '../screens/wod-tools/WodToolsScreen';
import UnitConverterScreen from '../screens/wod-tools/unit-converter/UnitConverterScreen';
import PercentTableScreen from '../screens/wod-tools/percent-table/PercentTableScreen';

import Logout from '../screens/auth/Logout';

import { tabHeight } from '../variables/variables';

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
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTintStyle: {
        fontWeight: 'bold'
      }
    },
  }
);

const TabNav = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Blog: { screen: BlogScreen },
    WOD: { screen: WodScreen },
    WodTools: { screen: WodToolsStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // stuff here
    }),
    initialRouteName: 'WodTools', //////////// FIX THIS
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey',
      activeBackgroundColor: '#4fd',
      inactiveBackgroundColor: '#053',
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

// const RootStack = createStackNavigator(
//   {
//     Main: MainScreen,
//     IAP: IAPScreen
//   },
//   {
//     initialRouteName: 'Main',
//     mode: 'modal',
//     headerMode: 'none'
//   }
// );

export default AppContainer = createAppContainer(MainDrawer);
