import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';

export default class Button extends React.Component {
  render() {    
    return(
      <TouchableHighlight 
        style={ this.props.enabled ? this.props.buttonStyle : this.props.disabledButtonStyle } 
        disabled={! this.props.enabled} 
        onPress={() => this.props.onPress() 
      }>
        <Text style={ this.props.buttonTextStyle }>{ this.props.text }</Text>
      </TouchableHighlight>
    )
  }
};

Button.propTypes = {
  text: PropTypes.string,
  enabled: PropTypes.bool,
  onPress: PropTypes.func,
  buttonStyle: Text.propTypes.style,
  disabledButtonStyle: Text.propTypes.style,
  buttonTextStyle: Text.propTypes.style 
};

const styles = StyleSheet.create({
  blackButton: {
    alignSelf: 'stretch',
    backgroundColor: 'black',
    alignItems: 'center',
    height: 40,
    marginBottom: 10
  },
  disabledBlackButton: {
    alignSelf: 'stretch',
    backgroundColor: 'grey',
    alignItems: 'center',
    height: 40,
    marginBottom: 10
  },
  blackButtonText: {
    paddingVertical: 10,
    color: 'white',
    fontWeight: '700'    
  },
  whiteButton: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 40,
    marginBottom: 10,
    borderColor: 'grey',
    borderWidth: 1
  },
  redButton: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    alignItems: 'center',
    height: 40,
    marginBottom: 10,
    borderColor: 'red',
    borderWidth: 1
  },
  whiteButtonText: {
    paddingVertical: 10,
    color: 'black',
    fontWeight: '700'    
  },
  redButtonText: {
    paddingVertical: 10,
    color: 'red',
    fontWeight: '700'    
  }
});

Button.Black = class Black extends Button {};

Button.Black.defaultProps = {
  buttonStyle: styles.blackButton,
  disabledButtonStyle: styles.disabledBlackButton,
  buttonTextStyle: styles.blackButtonText,
  enabled: true
};

Button.White = class White extends Button {};

Button.White.defaultProps = {
  buttonStyle: styles.whiteButton,
  disabledButtonStyle: styles.disabledWhiteButton,
  buttonTextStyle: styles.whiteButtonText,
  enabled: true
};

Button.Red = class Red extends Button {};

Button.Red.defaultProps = {
  buttonStyle: styles.redButton,
  disabledButtonStyle: styles.disabledRedButton,
  buttonTextStyle: styles.redButtonText,
  enabled: true
};
