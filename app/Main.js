import React, { Component } from 'react';
import Home from './screens/Home';
import Record from './screens/Record';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In'
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up'
    }
  }
});

const SignedIn = createStackNavigator({
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

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  )
}