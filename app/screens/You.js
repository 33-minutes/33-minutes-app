import React, { Component } from 'react';
import { Button, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import Meetings from '../components/Meetings'
import Icon from 'react-native-vector-icons/Ionicons';
import Actions from '../components/Actions';
import environment from '../Environment';
import { graphql, QueryRenderer } from 'react-relay';
import RetryOnError from '../components/RetryOnError';

export default class You extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query YouQuery {
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
              return <Text>Loading ...</Text>;
            }
            return (
              <View>
                <Meetings user={ props.user } />
                <Actions />
              </View>
            );
          }}>
        </QueryRenderer>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});