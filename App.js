import React, { Component } from 'react';
import { createRootNavigator } from './app/Main';
import environment from './app/Environment';
import { SERVER_URL } from 'react-native-dotenv';

export default class App extends Component {
  state = {
    signedIn: false
  }

  constructor(props) {
    super(props);

    console.log("Starting 33 Minutes, connecting to " + SERVER_URL + ".");
  }

  render() {
    const { signedIn } = this.state;
    
    const screenProps = { 
      relay: {
        environment: environment
      }
    }

    const Layout = createRootNavigator(signedIn, screenProps);

    return (
      <Layout screenProps={ screenProps } />
    );
  }
}
