import React, { Component } from 'react';
import Home from './screens/Home'
import Record from './screens/Record'
import { createStackNavigator } from 'react-navigation';

export const Main = createStackNavigator(
  {
    Main: {
      screen: Home,
    },
    Record: {
      screen: Record
    }
  }
);
