import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Meeting from './Meeting';

export default class Meetings extends React.Component {
  state = {
    meetings: []
  }

  removeMeetingByKey(key) {
    
  }

  render() {
    let meetings = this.state.meetings.map((val, key) => {
      return <Meeting key={key} keyval={key} val={val} deleteMethod={ () => this.removeMeetingByKey(key) } />
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
