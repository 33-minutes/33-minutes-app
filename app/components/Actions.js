import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

class Actions extends Component {
  render() {
    return(
      <View style={styles.actions}>
        <Icon.Button
          name='ios-pie'
          size={36}
          color='grey'
          backgroundColor='transparent'
          disabled={true}
          onPress={() => this.props.navigation.navigate('Budget')} />
        <Icon.Button
          name='ios-radio-button-on'
          size={64}
          color='red'
          backgroundColor='transparent'
          onPress={() => this.props.navigation.navigate('Record')} />
        <Icon.Button
          name='ios-settings'
          size={36}
          color='black'
          backgroundColor='transparent'
          onPress={() => this.props.navigation.navigate('Settings')} />
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  actions: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    flexDirection: 'row'
  }
});

export default withNavigation(Actions);