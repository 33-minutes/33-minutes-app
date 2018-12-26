import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';
import { graphql, QueryRenderer } from 'react-relay';
import RetryOnError from '../components/RetryOnError'
import Loading from '../components/Loading'

class Header extends Component {
  render() {
    return <QueryRenderer
      environment={this.props.relay.environment}
      query={graphql`
        query HeaderQuery {
          user {
            id
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
          <View style={styles.header}>
            <Icon.Button
              name='ios-create'
              size={36}
              color='black'
              backgroundColor='transparent'
              onPress={() => this.props.navigation.navigate('Create', props)} />
          </View>
        );
      }}>
    </QueryRenderer>
  } 
}

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderColor: 'silver',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
    flexDirection: 'row',
    backgroundColor: 'white'
  }
});

export default withNavigation(Header);