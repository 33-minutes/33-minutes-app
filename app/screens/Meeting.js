import React from 'react';
import moment from 'moment';
import twix from 'twix';
import { Alert, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import DeleteMeetingMutation from '../mutations/DeleteMeetingMutation';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

@withMappedNavigationProps()
export default class Meeting extends React.Component {
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.meetingTitle}>{
            this.props.meeting.title
          }</Text>

          <Text style={styles.meetingText}>{
            moment(this.props.meeting.started).format('dddd, MMMM Do, YYYY h:mm A')
          }</Text>

          <Text style={styles.meetingText}>{
            moment(this.props.meeting.finished).twix(this.props.meeting.started).humanizeLength()
          }</Text>
        </View>
        <View style={styles.actions}>
          <Icon.Button 
            name='ios-trash'
            size={48}
            padding={0}
            color='black'
            backgroundColor='transparent'
            onPress={() => this._deleteMeetingWithConfirmation()}>
          </Icon.Button>
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
    fontWeight: '500'
  },
  meetingText: {
    paddingLeft: 5
  },
  deleteMeetingText: {
    color: 'white'
  },
  actions: {
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 20
  }
});

Meeting.propTypes = {
  meeting: PropTypes.object,
  user: PropTypes.object
};
