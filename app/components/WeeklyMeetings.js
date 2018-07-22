import React from 'react';
import { ScrollView, FlatList, Text, StyleSheet } from 'react-native';
import WeeklyMeetingRow from './WeeklyMeetingRow';
import { createPaginationContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { withNavigation } from 'react-navigation';

class WeeklyMeetings extends React.Component {
  _renderWeeklyMeeting(val) {
    if (val.item.node) {
      return <WeeklyMeetingRow key={val.item.node.id} weeklyMeetings={val.item.node} user={this.props.user} />
    }
  }

  _loadMore() {
    if (! this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.props.relay.loadMore(
      10,
      error => {
        // TODO: warn
      },
    );
  }

  render() {
    let weeklyMeetings = this.props.user.weeklyMeetings.edges.filter((weeklyMeetings) => weeklyMeetings.node);
    if (weeklyMeetings.length > 0) {
      return <FlatList
        style={styles.weeklyMeetings} 
        data={weeklyMeetings}
        keyExtractor={(item) => { return item.node.__id }}
        renderItem={(item) => this._renderWeeklyMeeting(item)}
        onEndReached={() => this._loadMore() }
      />
    } else {
      return(
        <ScrollView>
          <Text style={styles.placeholder} key={0}>No weeklyMeetings.</Text>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  weeklyMeetings: {
    alignSelf: 'stretch'
  },
  placeholder: {
    padding: 20
  }
});

WeeklyMeetings.propTypes = {
  user: PropTypes.object
};

export default withNavigation(createPaginationContainer(
  WeeklyMeetings, 
  {
    user: graphql`
      fragment WeeklyMeetings_user on User
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        id
        weeklyMeetingBudget
        weeklyMeetings(
          first: $count
          after: $cursor
        ) @connection(key: "WeeklyMeetings_weeklyMeetings", filters: []) {
          edges {
            node {
              ...WeeklyMeetingRow_weeklyMeetings
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
  },
  {   
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.user && props.user.weeklyMeetings;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, {count, cursor}, fragmentVariables) {
      return {
        count,
        cursor
      };
    },
    query: graphql`
      query WeeklyMeetingsPaginationQuery(
        $count: Int!
        $cursor: String
      ) {
        user {
          ...WeeklyMeetings_user @arguments(count: $count, cursor: $cursor)
        }
      }
    `
  }
));
