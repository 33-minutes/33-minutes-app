import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RetryOnError, Loading, Actions, MeetingsList } from '../components'
import { graphql, QueryRenderer } from 'react-relay';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

@withMappedNavigationProps()
export default class You extends Component {
  render() {
    return (
      <QueryRenderer
        environment={this.props.relay.environment}
        query={graphql`
          query YouQuery {
            user {
              id
              ...MeetingsList_user
            }
          }
        `}
        render={({error, props, retry}) => {
          if (error) {
            return <RetryOnError message={error.message} retry={retry} />
          }
          if (! props) {
            return <Loading />
          }
          return (
            <SafeAreaView style={styles.container}>
              <MeetingsList user={ props.user } />
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