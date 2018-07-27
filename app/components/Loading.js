import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading ...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: 'grey' 
  }
});
