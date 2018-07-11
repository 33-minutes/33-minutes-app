import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import Actions from '../components/Actions'

export default class Following extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={{ padding: 20 }} key={0}>Social features coming soon.</Text>
        </ScrollView>
        <Actions />
      </SafeAreaView>
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
