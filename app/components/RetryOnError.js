import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

export default class RetryOnError extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.error }>{ this.props.message }, retry?</Text>
        <Icon.Button 
            name='ios-refresh'
            size={48}
            color='black'
            backgroundColor='transparent'
            onPress={ () => this.props.retry() }>
          </Icon.Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'    
  },
  error: {
    padding: 10,
    fontWeight: '500',
    color: 'red'
  }
});

RetryOnError.propTypes = {
  retry: PropTypes.func,
  message: PropTypes.string
};
