import Expo from 'expo';
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { firebaseConfig } from './settings';
import { Text, View, YellowBox } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import HouseholdScreen from './screens/HouseholdScreen';
import PetCreateScreen from './screens/PetCreateScreen';
import PetProfileScreen from './screens/PetProfileScreen';
import HousemateScreen from './screens/HousemateScreen';
import PetEditScreen from './screens/PetEditScreen';
import SettingsScreen from './screens/SettingsScreen';

YellowBox.ignoreWarnings(['Require cycle:']);

export default class App extends React.Component {
  componentWillMount() {
    firebaseApp = firebase.initializeApp(firebaseConfig);
  }

  render() {
    const MainNavigator = createAppContainer(
      createBottomTabNavigator({
        welcome: {
          screen: WelcomeScreen,
          navigationOptions: { tabBarVisible: false }
        },
        auth: {
          screen: AuthScreen,
          navigationOptions: { tabBarVisible: false }
        },
        main: {
          navigationOptions: { tabBarVisible: false },
          tabBarPosition: 'bottom',
          screen: createBottomTabNavigator({
            house: {
              screen: createStackNavigator({
                house: HouseholdScreen,
                create: PetCreateScreen,
                profile: PetProfileScreen,
                edit: PetEditScreen
              })
            },
            housemate: HousemateScreen,
          })
        }
      })
    );

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

