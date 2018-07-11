import React, { Component } from 'react';
import { createRootNavigator } from './app/Main';
import environment from './app/Environment';

export default class App extends Component {
  state = {
    signedIn: false
  }

  render() {
    const { signedIn } = this.state;
    
    const screenProps = { 
      relay: {
        environment: environment
      }
    }

    const Layout = createRootNavigator(signedIn);

    return (
      <Layout screenProps={ screenProps } />
    );
  }
}
