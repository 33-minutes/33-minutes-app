import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Button, ScrollView } from 'react-native';

import HideableView from 'react-native-hideable-view';
import Icon from 'react-native-vector-icons/Ionicons';

import TimerMachine from 'react-timer-machine';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

import { CreateMeetingMutation } from '../mutations';
import localStorage from 'react-native-sync-localstorage';

import { withMappedNavigationProps } from 'react-navigation-props-mapper';

@withMappedNavigationProps()
export default class Record extends React.Component {
  state = {
    isMeetingStarted: false,
    meetingStartedAt: null
  }

  componentWillMount() {
    localStorage.getAllFromLocalStorage().then(() => {
      this.setState({ 
        user: { id: localStorage.getItem('@33minutes:user/id') }
      });
    })
  }

  _start() {
    this.setState({ isMeetingStarted: true, meetingStartedAt: moment() })
  }

  _stop() {
    this.setState({ isMeetingStarted: false, meetingStartedAt: null })
    const environment = this.props.relay.environment;
    CreateMeetingMutation.commit(this.state.user.id, {
      environment,
      input: {
        title: 'Untitled Meeting',
        started: this.state.meetingStartedAt.toDate(),
        finished: moment().toDate()
      }
    }).then(response => {
      this.props.navigation.navigate('Main')
    }).catch(error => {
      alert(error.message);
    });
  }

  _toggle() {
    if (this.state.isMeetingStarted) {
      this._stop();
    } else {
      this._start();
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.infoContainer}>
          <HideableView visible={!this.state.isMeetingStarted}>
            <Text>GPS location coming soon.</Text>
          </HideableView>
          <HideableView visible={this.state.isMeetingStarted} style={styles.timer}>
            <Text style={styles.timerText}>
              <TimerMachine
                timeStart={1000}
                started={this.state.isMeetingStarted}
                countdown={false}
                interval={1000}
                formatTimer={(time, ms) =>
                  moment.duration(moment().diff(this.state.meetingStartedAt), "milliseconds").format("h [hours], m [minutes], s [seconds]")
                }
                >
              </TimerMachine>
            </Text>
          </HideableView>
        </ScrollView>
        <View style={styles.actions}>
          <Icon.Button 
            name={ this.state.isMeetingStarted ? 'ios-radio-button-off' : 'ios-radio-button-on' }
            size={64}
            padding={0}
            paddingLeft={16}
            color='red'
            backgroundColor='transparent'
            onPress={() => this._toggle()} />
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
  timer: {
    alignItems: 'center'
  },
  timerText: {
    fontSize: 16
  },
  actions: {
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 20
  }
});
