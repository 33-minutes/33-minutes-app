import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import HideableView from 'react-native-hideable-view';

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

    const meeting = { startDateTime: this.state.meetingStartedAt }
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
      <View style={styles.container}>
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
        <View style={styles.actions}>
          <Button
            onPress={() => this.toggleMeeting()}
            title={ this.state.isMeetingStarted ? 'Stop Meeting' : 'Start Meeting' }>
          </Button>
        </View>
      </View>
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
  timer: {
    alignItems: 'center',
    height: 50
  },
  timerText: {
    fontSize: 24,
    padding: 20
  },
  actions: {
    borderTopWidth: 1,
    padding: 50,
    marginTop: 10
  }
});
