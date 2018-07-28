import React, { Component } from 'react';
import { StatusBar, Text, View, StyleSheet, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { LoginMutation } from '../mutations'
import { Button, Logo } from '../components'
import localStorage from 'react-native-sync-localstorage';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import emailValidator from 'email-validator';

@withMappedNavigationProps()
export default class SignIn extends Component {
  state = { 
    email: '',
    password: '',
    message: ''
  };

  componentWillMount() {
    localStorage.getAllFromLocalStorage().then(() => {
      this.setState({ 
        email: localStorage.getItem('@33minutes:user/email'),
        password: localStorage.getItem('@33minutes:user/password')
      });
    })
  }

  _signIn() {
    const environment = this.props.relay.environment;
    LoginMutation.commit({
      environment,
      input: { 
        email: this.state.email, 
        password: this.state.password 
      }
    }).then(response => {
      localStorage.setItem('@33minutes:user/id', response.login.user.id);
      localStorage.setItem('@33minutes:user/email', this.state.email);
      localStorage.setItem('@33minutes:user/password', this.state.password);
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
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeContainer}>
          <Logo />
          <View style={styles.formContainer}>
            <Text style={styles.error}>{ this.state.message }</Text>
            <TextInput style={styles.input} 
              placeholder='e-mail address' 
              placeholderTextColor='rgba(0, 0, 0, 0.2)' 
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType='email-address'
              onChangeText={(text) => this.setState({ email: text })}
            >{ this.state.email }</TextInput>
            <TextInput style={styles.input} 
              placeholder='password' 
              placeholderTextColor='rgba(0, 0, 0, 0.2)' 
              returnKeyType='go'
              secureTextEntry
              onChangeText={(text) => this.setState({ password: text })}
              onSubmitEditing={() => this._signIn()}
              ref={(input) => this.passwordInput = input}
            >{ this.state.password }</TextInput>
            <Button.Black enabled={ this._isValid() } onPress={() => this._signIn()} text='LOGIN' />
            <Text 
              style={styles.link}
              onPress={() => this.props.navigation.navigate('SignUp')}>
              Don't have an account?
            </Text>
            <View style={styles.bumper} />
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
  },
  bumper: {
    height: 75
  }
});
