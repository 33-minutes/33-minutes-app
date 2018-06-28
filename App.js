import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  state = {
    isMeetingStarted: false
  }

  startMeeting() {
    this.setState({ isMeetingStarted: true })
  }

  stopMeeting() {
    this.setState({ isMeetingStarted: false })
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
        <Text>33 Minutes</Text>
        <Button
          onPress={() => this.toggleMeeting()}
          title={ this.state.isMeetingStarted ? 'Stop Meeting' : 'Start Meeting' }>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
