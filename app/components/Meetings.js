import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Meeting from './Meeting'

global.meetings = []

export default class Meetings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meetings: []
    }
  }

  deleteMeeting(key) {
    this.state.meetings.splice(key, 1)
    this.setState({ meetings: this.state.meetings })
    global.meetings = this.state.meetings
  }

  render() {

    let meetings = this.state.meetings.map((val, key) => {
      return <Meeting key={key} keyval={key} val={val} deleteMethod={ () => this.deleteMeeting(key) } />
    })

    return (
      <ScrollView style={styles.scrollContainer}>
          { meetings }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  }
});
