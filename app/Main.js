import React, { Component } from 'react';
import Home from './screens/Home';
import Record from './screens/Record';
import { createStackNavigator } from 'react-navigation';

export const Main = createStackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: '33 Minutes',
      headerBackTitle: 'Cancel'
    }
  },
  Record: {
    screen: Record,
    navigationOptions: {
      headerTitle: 'Record Time'
    }
  }
});
