import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Meeting from './Meeting';
import { connect } from 'react-redux';
import { fetchMeetings, deleteMeeting } from '../actions/meetingActions'
import PropTypes from 'prop-types';

class Meetings extends React.Component {
  componentWillMount() {
    this.props.fetchMeetings();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.meeting.startDateTime) {
      this.props.meetings.unshift(nextProps.meeting);
    } 
    
    if (nextProps.meeting.key !== undefined) {
      this.props.meetings.splice(nextProps.meeting.key, 1);
    }
  }

  removeMeetingByKey(key) {
    const meeting = { key: key }
    this.props.deleteMeeting(meeting);
  }

  render() {
    let meetings = this.props.meetings.map((val, key) => {
      return <Meeting key={key} keyval={key} val={val} deleteMethod={ () => this.removeMeetingByKey(key) } />
    })

    if (meetings.length == 0) {
      meetings.push(<Text style={{ padding: 20 }} key={0}>Press the record button below to record a meeting.</Text>);
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          { meetings }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

Meetings.propTypes = {
  fetchMeetings: PropTypes.func.isRequired,
  deleteMeeting: PropTypes.func.isRequired,
  meetings: PropTypes.array.isRequired,
  meeting: PropTypes.object,
};

const mapStateToProps = state => ({
  meetings: state.meetings.items,
  meeting: state.meetings.item
});

export default connect(mapStateToProps, { fetchMeetings, deleteMeeting })(Meetings);