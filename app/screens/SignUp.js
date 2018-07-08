import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';

export default class SignUp extends Component {
  onSignUp() {

  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.logoContainer}>
            <StatusBar barStyle='light-content' />
            <Text style={styles.title}>33 Minutes</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput style={styles.input} 
              placeholder='your name' 
              placeholderTextColor='rgba(0, 0, 0, 0.2)' 
              returnKeyType='next'
              autoCorrect={false}
              onSubmitEditing={() => this.emailInput.focus()}
            />
            <TextInput style={styles.input} 
              placeholder='e-mail address' 
              placeholderTextColor='rgba(0, 0, 0, 0.2)' 
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType='email-address'
              ref={(input) => this.emailInput = input}
            />
            <TextInput style={styles.input} 
              placeholder='password' 
              placeholderTextColor='rgba(0, 0, 0, 0.2)' 
              returnKeyType='go'
              secureTextEntry
              ref={(input) => this.passwordInput = input}
            />
            <TouchableOpacity style={styles.button}
              onPress={() => onSignUp().then(() => this.props.navigation.navigate('SignedIn')) }>
              <Text style={styles.buttonText}>SIGN-UP</Text>
            </TouchableOpacity>
            <Text 
              style={styles.link}
              onPress={() => this.props.navigation.navigate('SignIn')}>
              Already have an account?
            </Text>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  safeContainer: {
    flexGrow: 1,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'black',
    opacity: 0.9
  },
  formContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    alignSelf: 'stretch',
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    padding: 5
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: 'black',
    alignItems: 'center',
    height: 40
  },
  buttonText: {
    paddingVertical: 10,
    color: 'white',
    fontWeight: '700'    
  },
  link: {
    padding: 10,
    fontWeight: '500',
    textDecorationLine: 'underline'
  }
});
