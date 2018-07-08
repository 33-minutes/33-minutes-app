import React, { Component } from 'react';
import { createRootNavigator } from './app/Main'
import { Provider } from 'react-redux';
import store from './app/Store'

export default class App extends Component {
  state = {
    signedIn: false
  }

  render() {
    const { signedIn } = this.state;
    const Layout = createRootNavigator(signedIn);

    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
