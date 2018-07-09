import React, { Component } from 'react';
import { createRootNavigator } from './app/Main'

export default class App extends Component {
  state = {
    signedIn: false
  }

  render() {
    const { signedIn } = this.state;
    const Layout = createRootNavigator(signedIn);

    return (
      <Layout />
    );
  }
}
