import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Meeting from './Meeting'

export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMeetingStarted: false,
      meetingStartedAt: null,
      meetings: []
    }  
  }

  startMeeting() {
    this.setState({ isMeetingStarted: true, meetingStartedAt: new Date() })
  }

  stopMeeting() {
    this.state.meetings.push({
      startDateTime: this.state.meetingStartedAt
    })

    this.setState({ isMeetingStarted: false, meetingStartedAt: null, meetings: this.state.meetings })
  }

  toggleMeeting() {
    if (this.state.isMeetingStarted) {
      this.stopMeeting();
    } else {
      this.startMeeting();
    }
  }

  deleteMeeting(key) {
    this.state.meetings.splice(key, 1)
    this.setState({ meetings: this.state.meetings })
  }

  render() {

    let meetings = this.state.meetings.map((val, key) => {
      return <Meeting key={key} keyval={key} val={val} deleteMethod={ () => this.deleteMeeting(key) } />
    })

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>- 33 Minutes -</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          { meetings }
        </ScrollView>

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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingTop: 20,
    marginBottom: 10
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100
  },
  actions: {
    borderTopWidth: 1,
    padding: 50,
    marginTop: 10
  }
});
