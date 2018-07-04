import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Meetings from '../components/Meetings'

export default class You extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Meetings />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
