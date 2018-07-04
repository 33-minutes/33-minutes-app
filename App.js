import React, { Component } from 'react';
import { Main } from './app/Main'
import { Provider } from 'react-redux';
import store from './app/Store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
