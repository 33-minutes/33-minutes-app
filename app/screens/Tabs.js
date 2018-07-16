import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import Following from '../screens/Following';
import You from '../screens/You';

export const Tabs = createMaterialTopTabNavigator({
  You: {
    screen: You,
    navigationOptions: {
      tabBarLabel: 'You',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" color={tintColor} size={24} />
      )
    }
  },
  Following: {
    screen: Following,
    navigationOptions: {
      tabBarLabel: 'Following',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-people" color={tintColor} size={24} />
      )
    }
  }
}, {
  initialRouteName: 'You',
  swipeEnabled: true,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: 'blue',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      height: 0
    },
    showIcon: true,
  }
})