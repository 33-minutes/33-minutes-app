import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

export default class SignIn extends Component {
  render() {
    return (
      <View style={styles.logoContainer}>
        <Image style={styles.icon} source={require('../../assets/icons/app-icon.png')} />
        <Text style={styles.title}>33 Minutes</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },  
  title: {
    color: 'black',
    opacity: 0.9
  },
  icon: {
    height: 75,
    width: 75
  }
});
