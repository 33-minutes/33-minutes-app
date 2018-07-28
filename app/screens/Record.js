import React from 'react';
import { Alert, StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

import { CreateMeetingMutation } from '../mutations';
import localStorage from 'react-native-sync-localstorage';

import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { RetryOnError } from '../components';

@withMappedNavigationProps()
export default class Record extends React.Component {
  state = {
    isMeetingStarted: false,
    isMeetingRecording: false,
    meetingStartedAt: null,
    meetingFinishedAt: null,
    error: null,
    timer: null
  }

  static navigationOptions = {
    headerLeft: null
  }  

  constructor(props) {
    super(props);
    this._tick = this._tick.bind(this);
    this._retrySave = this._retrySave.bind(this);
  }

  componentWillMount() {
    localStorage.getAllFromLocalStorage().then(() => {
      this.setState({ 
        user: { id: localStorage.getItem('@33minutes:user/id') }
      });
    })
  }

  _cancelWithPrompt() {
    if (this.state.isMeetingStarted) {
      Alert.alert(
        'Cancel Meeting',
        'Are you sure?',
        [
          { text: 'No', style: 'cancel' },
          { text: 'Yes', onPress: () => this._cancel() },
        ],
        { cancelable: true }
      )
    } else {
      this._cancel();
    }
  }

  _clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  _cancel() {
    this._clearTimer();
    this.props.navigation.goBack();
  }

  _start() {
    this.setState({ isMeetingStarted: true, meetingStartedAt: moment() }, () => {
      this.timer = setInterval(this._tick, 1000);
    })
  }

  _stop() {
    this._clearTimer();
    this.setState({ isMeetingRecording: true, isMeetingStarted: false, meetingFinishedAt: moment(), error: null }, () => {
      this._save()
    })
  }

  _tick() {   
    this.setState({ elapsedTime: moment().diff(this.state.meetingStartedAt) })
  }

  _retrySave() {
    this.setState({ error: null }, () => {
      this._save();
    })
  }

  _save() {
    const environment = this.props.relay.environment;
    CreateMeetingMutation.commit(this.state.user.id, {
      environment,
      input: {
        title: 'Untitled Meeting',
        started: this.state.meetingStartedAt.toDate(),
        finished: this.state.meetingFinishedAt.toDate()
      }
    }).then(response => {
      this.props.navigation.navigate('Main')
    }).catch(error => {
      this.setState({ error: error.message })
    });
  }

  _toggle() {
    if (this.state.isMeetingStarted) {
      this._stop();
    } else {
      this._start();
    }
  }

  _timerText() {
    if (this.state.error) {
      return <RetryOnError message={this.state.error} retry={this._retrySave} />
    } else if (this.state.isMeetingRecording) {
      return <Text style={styles.timerText}>Saving ...</Text>
    } else if (this.state.isMeetingStarted) {
      return(
        <Text style={styles.timerText}>
          { moment.duration(this.state.elapsedTime, "milliseconds").format("h [hours], m [minutes], s [seconds]") }
        </Text>
        )
    } else {
      return <Text style={styles.timerText}>GPS location coming soon.</Text>
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.infoContainer}>
          { this._timerText() }
        </ScrollView>
        <View style={styles.actions}>
          <Icon.Button 
            name={ this.state.isMeetingStarted || this.state.error ? 'ios-radio-button-off' : 'ios-radio-button-on' }
            size={64}
            padding={0}
            paddingLeft={16}
            color='red'
            backgroundColor='transparent'
            onPress={() => this._toggle()} />
          <Text 
            style={styles.link}
            onPress={() => this._cancelWithPrompt()}>
            Cancel
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  infoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerText: {
    fontSize: 16
  },
  link: {
    padding: 10,
    fontWeight: '500',
    textDecorationLine: 'underline'
  },
  actions: {
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 20,
    paddingBottom: 10
  }
});
