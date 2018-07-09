import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Meeting from './Meeting';
import { createFragmentContainer, graphql } from 'react-relay';
import DeleteMeetingMutation from '../mutations/DeleteMeetingMutation';
import environment from '../Environment'
import localStorage from 'react-native-sync-localstorage';

class Meetings extends React.Component {
  componentWillMount() {
    localStorage.getAllFromLocalStorage().then(() => {
      this.setState({ 
        user: { id: localStorage.getItem('@33minutes:user/id') }
      });
    })
  }

  removeMeetingById(id) {
    DeleteMeetingMutation.commit(this.state.user.id, {
      environment,
      input: {
        id: id
      }
    }).then(response => {
      
    }).catch(error => {
      alert(error.message);
    });
  }

  render() {
    let meetings = this.props.user.meetings.edges.map(({node}) => {
      if (node) {
        return <Meeting key={node.__id} meeting={node} deleteMethod={ () => this.removeMeetingById(node.__id) } />
      }
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

export default createFragmentContainer(Meetings, graphql`
  fragment Meetings_user on User {
    meetings(last: 10) @connection(key: "Meetings_meetings", filters: []) {
      edges {
        node {
          ...Meeting_meeting
        }
      }
    }
  }
`)