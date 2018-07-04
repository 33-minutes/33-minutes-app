import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

export default class Following extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={{ padding: 20 }} key={0}>Social features coming soon.</Text>
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
