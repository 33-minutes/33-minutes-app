import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { UpdateUserMutation, LogoutMutation, DeleteUserMutation } from '../mutations'
import { withNavigation } from 'react-navigation';
import RetryOnError from '../components/RetryOnError';
import { graphql, QueryRenderer } from 'react-relay';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import SettingsList from 'react-native-settings-list';
import localStorage from 'react-native-sync-localstorage';

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

          return (
            <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Account</Text>
              </View>
              <View style={styles.settings}>
                <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                  <SettingsList.Item 
                    id='name' 
                    title='name' 
                    isEditable={true} 
                    value={props.user.name}
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
                    value={props.user.email}
                    titleStyle={styles.settingsItemTitle}
                    onTextChange={(text) => this.setState({ 
                      user: { 
                        ...this.state.user,
                        email: text
                      },
                      dirty: true
                    })}
                  />
                </SettingsList>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={this.state.dirty ? styles.button : styles.disabledButton} disabled={! this.state.dirty} onPress={() => this._save()}>
                  <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.whiteButton} onPress={() => this._logout()}>
                  <Text style={styles.whiteButtonText}>LOGOUT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.redButton} onPress={() => this._deleteWithConfirmation()}>
                  <Text style={styles.redButtonText}>DELETE ACCOUNT</Text>
                </TouchableOpacity>
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
    fontSize: 16
  },
  settings: {
    flexGrow: 1,
    backgroundColor:'#EFEFF4'
  },
  settingsItemTitle: {
    color: 'grey'
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: 'black',
    alignItems: 'center',
    height: 40,
    marginBottom: 10
  },
  disabledButton: {
    alignSelf: 'stretch',
    backgroundColor: 'grey',
    alignItems: 'center',
    height: 40,
    marginBottom: 10
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
  buttonText: {
    paddingVertical: 10,
    color: 'white',
    fontWeight: '700'    
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
  },
  actions: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
});

export default withNavigation(Settings);