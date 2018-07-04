import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import twix from 'twix';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Meeting extends React.Component {
  deleteItem() {
    Alert.alert(
      'Delete Meeting',
      'Are you sure?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => this.props.deleteMethod() },
      ],
      { cancelable: true }
    )
  }

  render() {
    return (
      <View key={this.props.keyval} style={styles.meeting}>
        <Text style={styles.meetingText}>{
          moment(this.props.val.startDateTime).format('dddd, MMMM Do, YYYY h:mm A')
        }</Text>

        <Text style={styles.meetingText}>{
          moment(this.props.val.endDateTime).twix(this.props.val.startDateTime).humanizeLength()
        }</Text>

        <View style={ styles.deleteMeetingButton }>
          <Icon.Button 
            name='ios-trash'
            size={36}
            color='black'
            backgroundColor='transparent'
            onPress={ () => this.deleteItem() }>
          </Icon.Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  meeting: {
    position: 'relative',
    padding: 15,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd'
  },
  meetingText: {
    paddingLeft: 5
  },
  deleteMeetingButton: {
    position: 'absolute',
    top: 10,
    bottom: 10,
    right: 10
  },
  deleteMeetingText: {
    color: 'white'
  }
});
