import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Logo, Button } from '../components'
import localStorage from 'react-native-sync-localstorage';
import { CreateUserMutation } from '../mutations'
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import emailValidator from 'email-validator';

@withMappedNavigationProps()
export default class SignUp extends Component {
  state = { 
    name: '',
    email: '',
    password: '',
    message: ''
  };

  componentWillMount() {
    return localStorage.getAllFromLocalStorage();
  }

  _signup() {
    const environment = this.props.relay.environment;
    CreateUserMutation.commit({
      environment,
      input: {
        name: this.state.name, 
        email: this.state.email, 
        password: this.state.password 
      }
    }).then(response => {
      localStorage.setItem('@33minutes:user/email', this.state.email);
      this.props.navigation.navigate('SignedIn')
    }).catch(error => {
      this.setState({ message: error.message });
    });
  }

  _isValid() {
    return this.state.email !== undefined
      && this.state.email.length > 0 
      && emailValidator.validate(this.state.email)
      && this.state.password !== undefined
      && this.state.password.length > 0;
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <SafeAreaView style={styles.safeContainer}>
          <Logo />
          <View style={styles.formContainer}>
            <Text style={styles.error}>{ this.state.message }</Text>
            <TextInput style={styles.input} 
              placeholder='your name' 
              placeholderTextColor='rgba(0, 0, 0, 0.2)' 
              returnKeyType='next'
              autoCorrect={false}
              onSubmitEditing={() => this.emailInput.focus()}
              onChangeText={(text) => this.setState({ name: text })}
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
              onChangeText={(text) => this.setState({ email: text })}
            />
            <TextInput style={styles.input} 
              placeholder='password' 
              placeholderTextColor='rgba(0, 0, 0, 0.2)' 
              returnKeyType='go'
              secureTextEntry
              ref={(input) => this.passwordInput = input}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <Button.Black enabled={this._isValid()} onPress={() => this._signup()} text='SIGN UP' />
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
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  formContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  error: {
    padding: 10,
    fontWeight: '500',
    color: 'red'
  },
  input: {
    alignSelf: 'stretch',
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    padding: 5
  },
  link: {
    padding: 10,
    fontWeight: '500',
    textDecorationLine: 'underline'
  }
});
