import React from 'react';
import { ScrollView, FlatList, Text, StyleSheet } from 'react-native';
import MeetingRow from './MeetingRow';
import { createPaginationContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { withNavigation } from 'react-navigation';

class MeetingsList extends React.Component {
  _renderMeeting(val) {
    if (val.item.node) {
      return <MeetingRow key={val.item.node.__id} meeting={val.item.node} user={this.props.user} />
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
    let meetings = this.props.user.meetings.edges.filter((meeting) => meeting.node);
    if (meetings.length > 0) {
      return <FlatList
        style={styles.meetings} 
        data={meetings}
        keyExtractor={(item) => { return item.node.__id }}
        renderItem={(item) => this._renderMeeting(item)}
        onEndReached={() => this._loadMore() }
      />
    } else {
      return(
        <ScrollView>
          <Text style={styles.placeholder} key={0}>Click button to record a meeting duration.</Text>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  meetings: {
    alignSelf: 'stretch'
  },
  placeholder: {
    padding: 20
  }
});

MeetingsList.propTypes = {
  user: PropTypes.object
};

export default withNavigation(createPaginationContainer(
  MeetingsList, 
  {
    user: graphql`
      fragment MeetingsList_user on User
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 10 }
        cursor: { type: "String" }
      ) {
        id
        meetings(
          first: $count
          after: $cursor
        ) @connection(key: "MeetingsList_meetings", filters: []) {
          edges {
            node {
              id
              ...MeetingRow_meeting
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
      query MeetingsListPaginationQuery(
        $count: Int!
        $cursor: String
      ) {
        user {
          ...MeetingsList_user @arguments(count: $count, cursor: $cursor)
        }
      }
    `
  }
));
