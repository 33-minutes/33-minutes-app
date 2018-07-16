import React from 'react';
import moment from 'moment';
import twix from 'twix';
import { Alert, StyleSheet, View, Text, SafeAreaView, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { DeleteMeetingMutation, UpdateMeetingMutation } from '../mutations';
import { Button } from '../components';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

@withMappedNavigationProps()
export default class Meeting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      meeting: props.meeting,
      dirty: false
    }
  }

  _deleteMeeting() {
    const environment = this.props.relay.environment;
    DeleteMeetingMutation.commit(this.props.user.id, {
      environment,
      input: {
        id: this.props.meeting.id
      }
    }).then(response => {
      this.props.navigation.goBack();
    }).catch(error => {
      alert(error.message);
    });
  }

  _deleteMeetingWithConfirmation() {
    Alert.alert(
      'Delete Meeting',
      'Are you sure?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => this._deleteMeeting() },
      ],
      { cancelable: true }
    )
  }

  _save() {
    const environment = this.props.relay.environment;
    UpdateMeetingMutation.commit(this.props.user.id, {
      environment,
      input: this.state.meeting
    }).then(response => {
      this.setState({ dirty: false })
    }).catch(error => {
      alert(error.message);
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infoContainer}>
          <TextInput 
            style={styles.meetingTitle} 
            placeholderText='title'
            placeholderTextColor='rgba(0, 0, 0, 0.2)' 
            ref={(input) => this.titleInput = input}
            value={ this.state.meeting.title }
            onChangeText={(text) => this.setState({ 
              meeting: { 
                ...this.state.meeting,
                title: text
              },
              dirty: true
            })
          } />

          <Text style={styles.meetingText}>{
            moment(this.props.meeting.started).format('dddd, MMMM Do, YYYY h:mm A')
          }</Text>

          <Text style={styles.meetingText}>{
            moment(this.props.meeting.finished).twix(this.props.meeting.started).humanizeLength()
          }</Text>
        </View>
        <View style={styles.actions}>
          <Button.Black enabled={ this.state.dirty } onPress={() => this._save()} text='SAVE' />
          <Button.White onPress={() => this._deleteMeetingWithConfirmation()} text='DELETE' />
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
    padding: 20
  },
  meetingTitle: {
    fontSize: 36,
    fontWeight: '500',
    alignSelf: 'stretch',
    marginBottom: 10,
    padding: 5
  },
  meetingText: {
    paddingLeft: 5
  },
  deleteMeetingText: {
    color: 'white'
  },
  actions: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
});

Meeting.propTypes = {
  meeting: PropTypes.object,
  user: PropTypes.object
};
