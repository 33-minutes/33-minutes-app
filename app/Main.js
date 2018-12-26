import React from 'react';
import { Stats, Settings, Create, Record, Meeting, SignUp, SignIn } from './screens';
import { Tabs } from './screens/Tabs'
import { Header } from './components';
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

const SignedIn = (initialProps) => createStackNavigator({
  Main: {
    screen: Tabs,
    navigationOptions: {
      header: props => <Header relay={initialProps.relay} user={initialProps.user} />,
      headerStyle: {
        backgroundColor: 'transparent'
      },
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
  Create: {
    screen: Create,
    navigationOptions: {
      headerTitle: 'Create Meeting'
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

export const createRootNavigator = (signedIn = false, initialProps) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn(initialProps)
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