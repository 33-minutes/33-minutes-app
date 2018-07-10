import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import twix from 'twix';
import Icon from 'react-native-vector-icons/Ionicons';
import { createFragmentContainer, graphql } from 'react-relay';
import environment from '../Environment'
import DeleteMeetingMutation from '../mutations/DeleteMeetingMutation';
import PropTypes from 'prop-types';

class Meeting extends React.Component {
  removeMeeting() {
    DeleteMeetingMutation.commit(this.props.user.id, {
      environment,
      input: {
        id: this.props.meeting.id
      }
    }).then(response => {
      
    }).catch(error => {
      alert(error.message);
    });
  }

  deleteItem() {
    Alert.alert(
      'Delete Meeting',
      'Are you sure?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => this.removeMeeting() },
      ],
      { cancelable: true }
    )
  }

  render() {    
    return (
      <View key={this.props.meeting.id} style={styles.meeting}>
        <Text style={styles.meetingText}>{
          this.props.meeting.title
        }</Text>

        <Text style={styles.meetingText}>{
          moment(this.props.meeting.started).format('dddd, MMMM Do, YYYY h:mm A')
        }</Text>

        <Text style={styles.meetingText}>{
          moment(this.props.meeting.finished).twix(this.props.meeting.started).humanizeLength()
        }</Text>

        <View style={ styles.deleteMeetingButton }>
          <Icon.Button 
            name='ios-trash'
            size={36}
            color='black'
            backgroundColor='transparent'
            onPress={ () => this.deleteItem() }>
          </Icon.Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  meeting: {
    position: 'relative',
    padding: 15,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd'
  },
  meetingText: {
    paddingLeft: 5
  },
  deleteMeetingButton: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    right: 10
  },
  deleteMeetingText: {
    color: 'white'
  }
});

Meeting.propTypes = {
  user: PropTypes.object,
  meeting: PropTypes.object
};

export default createFragmentContainer(Meeting, graphql`
  fragment Meeting_meeting on Meeting {
    id
    title
    started
    finished
  }
`)