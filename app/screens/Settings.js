import React from 'react';
import { Alert, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { UpdateUserMutation, LogoutMutation, DeleteUserMutation } from '../mutations'
import { withNavigation } from 'react-navigation';
import { Button, RetryOnError } from '../components';
import { graphql, QueryRenderer } from 'react-relay';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import SettingsList from 'react-native-settings-list';
import localStorage from 'react-native-sync-localstorage';
import Slider from "react-native-slider";

@withMappedNavigationProps()
class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {

      },
      dirty: false
    }
  }

  _logout() {
    const environment = this.props.relay.environment;
    LogoutMutation.commit({
      environment
    }).then(response => {
      localStorage.removeItem('@33minutes:user/password');
      this.props.navigation.navigate('SignIn');
    }).catch(error => {
      alert(error.message);
    });
  }

  _save() {
    const environment = this.props.relay.environment;
    UpdateUserMutation.commit({
      environment,
      input: this.state.user
    }).then(response => {
      if (this.state.user.email) {
        localStorage.setItem('@33minutes:user/email', this.state.user.email);
      }
      if (this.state.user.password && this.state.user.passwordConfirmation) {
        localStorage.setItem('@33minutes:user/password', this.state.user.password);
      }
      this.setState({ dirty: false })
    }).catch(error => {
      alert(error.message);
    });
  }

  _delete() {
    const environment = this.props.relay.environment;
    DeleteUserMutation.commit({
      environment
    }).then(response => {
      localStorage.removeItem('@33minutes:user/email');
      localStorage.removeItem('@33minutes:user/password');
      this.props.navigation.navigate('SignIn');
    }).catch(error => {
      alert(error.message);
    });
  }

  _deleteWithConfirmation() {
    Alert.alert(
      'Permanently Delete Account',
      'Are you sure?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => this._delete() },
      ],
      { cancelable: true }
    )
  }

  _isValid() {
    if (! this.state.dirty) {
      return false;
    }

    if (this.state.user.email && (this.state.user.email.length == 0 || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.user.email) === false)) {
      return false;
    }

    if (this.state.user.password != this.state.user.passwordConfirmation) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <QueryRenderer
        environment={this.props.relay.environment}
        query={graphql`
          query SettingsQuery {
            user {
              id
              name
              email
              weeklyMeetingBudget
            }
          }
        `}
        render={({error, props, retry}) => {          
          if (error) {
            return <RetryOnError message={error.message} retry={retry} />
          }
          
          if (! props) {
            return (
              <SafeAreaView style={styles.container}>
                <Text>Loading ...</Text>
              </SafeAreaView>
            );
          }

          var weeklyMeetingBudget = this.state.user.weeklyMeetingBudget !== undefined 
            ? this.state.user.weeklyMeetingBudget 
            : props.user.weeklyMeetingBudget;
      
          return (
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Account</Text>
              </View>
              <View style={styles.settings}>
                <View>
                  <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                    <SettingsList.Item 
                      id='name' 
                      title='name' 
                      isEditable={true} 
                      hasNavArrow={false}
                      value={ props.user.name }
                      titleStyle={styles.settingsItemTitle}
                      onTextChange={(text) => this.setState({ 
                        user: { 
                          ...this.state.user,
                          name: text
                        },
                        dirty: true
                      })}
                    />
                    <SettingsList.Item 
                      id='e-mail' 
                      title='e-mail' 
                      isEditable={true} 
                      hasNavArrow={false}
                      keyboardType='email-address'
                      textInputProps={{
                        autoCapitalize: 'none'
                      }}
                      value={ props.user.email }
                      titleStyle={styles.settingsItemTitle}
                      onTextChange={(text) => this.setState({ 
                        user: { 
                          ...this.state.user,
                          email: text
                        },
                        dirty: true
                      })}
                    />
                    <SettingsList.Item 
                      id='password' 
                      title='password' 
                      isEditable={true} 
                      hasNavArrow={false}
                      titleStyle={styles.settingsItemTitle}
                      textInputProps={{
                        autoCapitalize: 'none',
                        secureTextEntry: true
                      }}
                      onTextChange={(text) => this.setState({ 
                        user: { 
                          ...this.state.user,
                          password: text.length > 0 ? text : null
                        },
                        dirty: true
                      })}
                    />
                    <SettingsList.Item 
                      id='passwordConfirmation' 
                      title='password confirmation' 
                      isEditable={true} 
                      hasNavArrow={false}
                      titleStyle={styles.settingsItemTitle}
                      textInputProps={{
                        autoCapitalize: 'none',
                        secureTextEntry: true
                      }}
                      onTextChange={(text) => this.setState({ 
                        user: { 
                          ...this.state.user,
                          passwordConfirmation: text.length > 0 ? text : null 
                        },
                        dirty: true
                      })}
                    />
                  </SettingsList>
                </View>
                <View style={styles.header}>
                  <Text style={styles.headerText}>
                    Weekly Meeting Budget = { 
                      weeklyMeetingBudget 
                    } hour{ 
                      weeklyMeetingBudget == 1 ? '' : 's'
                    } 
                  </Text>
                </View>
                <View style={styles.settingsItem}>
                  <Slider
                    minimumValue={0.0}
                    maximumValue={168}
                    step={0.5}
                    trackStyle={styles.sliderTrack}
                    thumbStyle={styles.sliderThumb}
                    value={ props.user.weeklyMeetingBudget }
                    onValueChange={(value) => this.setState({ 
                      user: { 
                        ...this.state.user,
                        weeklyMeetingBudget: value 
                      }, 
                      dirty: true 
                    })}
                  />
                </View>            
              </View>
              <View style={styles.actions}>
                <Button.Black enabled={ this._isValid() } onPress={() => this._save()} text='SAVE' />
                <Button.White onPress={() => this._logout()} text='LOGOUT' />
                <Button.Red onPress={() => this._deleteWithConfirmation()} text='DELETE ACCOUNT' />
              </View>
            </SafeAreaView>        
          );
        }}>
      </QueryRenderer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    borderBottomWidth: 1, 
    backgroundColor: '#f7f7f8',
    borderColor: '#c8c7cc'
  },
  headerText: {
    alignSelf:'center',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  settings: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  settingsItemTitle: {
    color: 'grey'
  },
  settingsItem: {
    padding: 20
  },
  actions: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#c8c7cc'
  },
  sliderTrack: {
    height: 2,
    borderRadius: 1,
  },
  sliderThumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0, 
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  }
});

export default withNavigation(Settings);