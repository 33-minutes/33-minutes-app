import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import twix from 'twix';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

class MeetingRow extends React.Component {
  render() {    
    return (
      <View key={this.props.meeting.id} style={styles.meeting}>
        <TouchableOpacity onPress={() => 
          this.props.navigation.navigate('Meeting', { 
            meeting: this.props.meeting,
            user: this.props.user
          })}>
        }>
          <Text style={styles.meetingTitle}>{
            this.props.meeting.title
          }</Text>

          <Text style={styles.meetingText}>{
            moment(this.props.meeting.started).format('dddd, MMMM Do, YYYY h:mm A')
          }</Text>

          <Text style={styles.meetingText}>{
            moment(this.props.meeting.finished).twix(this.props.meeting.started).humanizeLength()
          }</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  meeting: {
    alignSelf: 'stretch',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd'
  },
  meetingTitle: {
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 24,
    fontWeight: '500'
  },
  meetingText: {
    paddingLeft: 5
  }
});

MeetingRow.propTypes = {
  user: PropTypes.object,
  meeting: PropTypes.object
};

export default withNavigation(createFragmentContainer(MeetingRow, graphql`
  fragment MeetingRow_meeting on Meeting {
    id
    title
    started
    finished
  }
`))