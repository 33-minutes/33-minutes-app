import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Meeting from './screens/Meeting';
import Record from './screens/Record';
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
      headerTitle: '33 Minutes',
      headerBackTitle: 'Back'
    }
  },
  Record: {
    screen: Record,
    navigationOptions: {
      headerTitle: 'Record Time'
    }
  },
  Meeting: {
    screen: Meeting,
    navigationOptions: {
      headerTitle: 'Edit Meeting'
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