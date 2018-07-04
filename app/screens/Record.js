import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Button, ScrollView } from 'react-native';

import HideableView from 'react-native-hideable-view';
import Icon from 'react-native-vector-icons/Ionicons';

import TimerMachine from 'react-timer-machine'
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

import { connect } from 'react-redux';
import { createMeeting } from '../actions/meetingActions'
import PropTypes from 'prop-types';

class Record extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMeetingStarted: false,
      meetingStartedAt: null
    }  
  }

  startMeeting() {
    this.setState({ isMeetingStarted: true, meetingStartedAt: new Date() })
  }

  stopMeeting() {
    this.setState({ isMeetingStarted: false, meetingStartedAt: null })

    const meeting = { 
      startDateTime: this.state.meetingStartedAt,
      endDateTime: new Date()
    }

    this.props.createMeeting(meeting)

    this.props.navigation.navigate('Main')
  }

  toggleMeeting() {
    if (this.state.isMeetingStarted) {
      this.stopMeeting();
    } else {
      this.startMeeting();
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.infoContainer}>
          <HideableView visible={this.state.isMeetingStarted} style={styles.timer}>
            <Text style={styles.timerText}>
              <TimerMachine
                timeStart={1000}
                started={this.state.isMeetingStarted}
                countdown={false}
                interval={1000}
                formatTimer={(time, ms) =>
                  moment.duration(ms, "milliseconds").format("h [hours], m [minutes], s [seconds]")
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
            color='red'
            backgroundColor='transparent'
            onPress={() => this.toggleMeeting()}>
          </Icon.Button>
        </View>
      </SafeAreaView>
    );
  }
}

Record.propTypes = {
  createMeeting: PropTypes.func.isRequired
};

export default connect(null, { createMeeting })(Record);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  infoContainer: {
    flexGrow: 1,
    justifyContent: 'center'
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
