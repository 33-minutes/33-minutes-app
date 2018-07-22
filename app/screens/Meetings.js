import React, { Component } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import Meetings from '../components/Meetings'
import Actions from '../components/Actions';
import { graphql, QueryRenderer } from 'react-relay';
import RetryOnError from '../components/RetryOnError';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

@withMappedNavigationProps()
export default class Meetings extends Component {
  render() {
    return (
      <QueryRenderer
        environment={this.props.relay.environment}
        query={graphql`
          query MeetingsQuery {
            user {
              id
              ...Meetings_user
            }
          }
        `}
        render={({error, props, retry}) => {
          if (error) {
            return <RetryOnError message={error.message} retry={retry} />
          }
          if (! props) {
            return (
              <SafeAreaView style={styles.container}>
                <Text>Loading ...</Text>
              </SafeAreaView>
            );
          }
          return (
            <SafeAreaView style={styles.container}>
              <Meetings user={ props.user } />
              <Actions />
            </SafeAreaView>
          );
        }}>
      </QueryRenderer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});