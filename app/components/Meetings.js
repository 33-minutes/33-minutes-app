import React from 'react';
import { FlatList, View, Text, StyleSheet, ScrollView } from 'react-native';
import Meeting from './Meeting';
import { createPaginationContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

class Meetings extends React.Component {
  renderMeeting(val) {
    if (val.item.node) {
      return <Meeting key={val.item.node.__id} meeting={val.item.node} user={this.props.user} />
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
    return (
      <FlatList 
        data={this.props.user.meetings.edges}
        // bug: https://github.com/33-minutes/33-minutes-app/issues/5
        keyExtractor={(item) => { if (item.node) { return item.node.__id } else { return uuid() } } }
        renderItem={(item) => this.renderMeeting(item)}
        onEndReached={() => this._loadMore() }
      />
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
  user: PropTypes.object
};

export default createPaginationContainer(
  Meetings, 
  {
    user: graphql`
      fragment Meetings_user on User
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        id
        meetings(
          first: $count
          after: $cursor
        ) @connection(key: "Meetings_meetings", filters: []) {
          edges {
            node {
              id
              ...Meeting_meeting
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
      return props.user && props.user.meetings;
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
      query MeetingsPaginationQuery(
        $count: Int!
        $cursor: String
      ) {
        user {
          ...Meetings_user @arguments(count: $count, cursor: $cursor)
        }
      }
    `
  }
);
