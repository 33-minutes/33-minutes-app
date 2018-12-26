import React from 'react';
import { Stats, Settings, Record, Meeting, SignUp, SignIn } from './screens';
import { Tabs } from './screens/Tabs'
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
    screen: Tabs,
    navigationOptions: {
      headerTitle: 'Feed',
      headerBackTitle: 'Back'
    }
  },
  Record: {
    screen: Record,
    navigationOptions: {
      headerTitle: 'Record Meeting'
    }
  },
  Meeting: {
    screen: Meeting,
    navigationOptions: {
      headerTitle: 'Edit Meeting'
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      headerTitle: 'Settings'
    }
  },
  Stats: {
    screen: Stats,
    navigationOptions: {
      headerTitle: 'Stats'
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