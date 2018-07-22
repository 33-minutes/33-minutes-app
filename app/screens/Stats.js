import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { RetryOnError } from '../components';
import { graphql, QueryRenderer } from 'react-relay';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import WeeklyMeetings from '../components/WeeklyMeetings'

@withMappedNavigationProps()
class Stats extends React.Component {
  render() {
    return (
      <QueryRenderer
        environment={this.props.relay.environment}
        query={graphql`
          query StatsQuery {
            user {
              id
              weeklyMeetingBudget
              ...WeeklyMeetings_user
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
              <WeeklyMeetings user={ props.user } />
            </SafeAreaView>        
          );
        }}>
      </QueryRenderer>
    );
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

export default withNavigation(Stats);