import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Meetings from '../components/Meetings'
import Icon from 'react-native-vector-icons/Ionicons';
import Actions from '../components/Actions'

export default class You extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Meetings />
        <Actions />
      </SafeAreaView>
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
