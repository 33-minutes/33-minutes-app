import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Tabs } from './Tabs'
import Icon from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {
  render() {
    return(
      <SafeAreaView style={styles.container}>
        <Tabs />
        <View style={styles.actions}>
          <Icon.Button 
            name='ios-radio-button-on'
            size={64}
            padding={0}
            color='red'
            backgroundColor='transparent'
            onPress={() => this.props.navigation.navigate('Record')}>
          </Icon.Button>
        </View>
      </SafeAreaView>
    ) 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 20
  }
});
