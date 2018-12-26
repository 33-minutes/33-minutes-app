import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import twix from 'twix';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

class MeetingRow extends React.Component {
  _navigate() {
    this.props.navigation.navigate('Meeting', { 
      meeting: this.props.meeting,
      user: this.props.user
    })
  }

  render() {
    const started = moment(this.props.meeting.started);
    const finished = moment(this.props.meeting.finished);
    const duration = moment.duration(finished.diff(started));

    return (
      <View key={this.props.meeting.id} style={styles.meeting}>
        <TouchableOpacity onPress={() => this._navigate()}>
          <Text style={styles.meetingTitle}>{
            this.props.meeting.title
          }</Text>

          <Text style={styles.meetingText}>{
            started.format('dddd, MMMM Do, YYYY h:mm A')
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
    backgroundColor: '#f7f7f8',
    borderTopWidth: 1,
    borderTopColor: '#c8c7cc',
    borderBottomWidth: 1,
    borderBottomColor: '#c8c7cc'
  },
  meetingTitle: {
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: 'bold'
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
    location
  }
`))