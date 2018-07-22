import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import humanizeDuration from 'humanize-duration';
import moment from 'moment';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

class WeeklyMeetingRow extends React.Component {
  render() { 
    var weekStart = moment(this.props.weeklyMeetings.weekStart);

    if (this.props.weeklyMeetings.duration == 0) {
      var duration = 'no meetings';
    } else if (this.props.weeklyMeetings.duration < 60) {
      var duration = 'virtually no meetings';
    } else {
      var duration = humanizeDuration(this.props.weeklyMeetings.duration * 1000, { units: ['h', 'm'], round: true, delimiter: ' and ' })
    }

    if (this.props.user.weeklyMeetingBudget * 3600 < this.props.weeklyMeetings.duration) {
      var weeklyMeetingsStyle = styles.weeklyMeetingsOverBudget
    } else {
      var weeklyMeetingsStyle = styles.weeklyMeetingsUnderBudget
    }

    return (
      <View key={this.props.weeklyMeetings.id} style={styles.weeklyMeetings}>
        <Text style={styles.weeklyMeetingsTitle}>{
          'Week of ' + weekStart.format('MMMM Do, YYYY')
        }</Text>

       <Text style={weeklyMeetingsStyle}>{
         duration
       }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weeklyMeetings: {
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: '#f7f7f8',
    borderTopWidth: 1,
    borderTopColor: '#c8c7cc',
    borderBottomWidth: 1,
    borderBottomColor: '#c8c7cc'
  },
  weeklyMeetingsOverBudget: {
    color: 'red',
    paddingLeft: 5
  },
  weeklyMeetingsUnderBudget: {
    color: 'green',
    paddingLeft: 5
  },
  weeklyMeetingsTitle: {
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  weeklyMeetingsText: {
    paddingLeft: 5
  }
});

WeeklyMeetingRow.propTypes = {
  user: PropTypes.object,
  weeklyMeetings: PropTypes.object
};

export default withNavigation(createFragmentContainer(WeeklyMeetingRow, graphql`
  fragment WeeklyMeetingRow_weeklyMeetings on WeeklyMeetings {
    id
    year
    week
    weekStart
    duration
  }
`))