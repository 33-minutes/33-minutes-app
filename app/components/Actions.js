import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

class Actions extends Component {
  render() {
    return(
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
    )
  } 
}

const styles = StyleSheet.create({
  actions: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 20
  }
});

export default withNavigation(Actions);