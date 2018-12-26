import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button, CurrentLocation } from '../components';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { CreateMeetingMutation } from '../mutations';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import twix from 'twix';

@withMappedNavigationProps()
export default class Create extends Component {
  state = {
    pickStartedDate: false,
    pickFinishedDate: false,
    meeting: {
      title: 'Manually Created Meeting',
      started: null,
      finished: null,
      location: []
    }
  }

  _pickStartedDate = () => this.setState({ pickStartedDate: true });
  _pickFinishedDate = () => this.setState({ pickFinishedDate: true });
  _hideDateTimePicker = () => this.setState({ pickStartedDate: false, pickFinishedDate: false });

  _handleDatePicked = (date) => {
    if (this.state.pickStartedDate) {
      this.setState({ meeting: { ...this.state.meeting, started: date }});
    } else if (this.state.pickFinishedDate) {
      this.setState({ meeting: { ...this.state.meeting, finished: date }});
    }

    this._hideDateTimePicker();
  };

  _cancel() {
    this.props.navigation.goBack();
  }

  _save() {
    const environment = this.props.relay.environment;    
    CreateMeetingMutation.commit(this.props.user.id, {
      environment,
      input: this.state.meeting
    }).then(response => {
      this.props.navigation.navigate('Main')
    }).catch(error => {
      this.setState({ error: error.message })
    });
  }

  _changeLocation(location) {
    this.setState({
        meeting: { 
          ...this.state.meeting,
          location: [
            location.latitude,
            location.longitude
          ]
        }
    })
  }

  render() {
    const started = this.state.meeting.started ? moment(this.state.meeting.started) : null;
    const finished = this.state.meeting.finished ? moment(this.state.meeting.finished) : null;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infoContainer}>
          <TextInput 
            style={styles.meetingTitle} 
            placeholderText='title'
            placeholderTextColor='rgba(0, 0, 0, 0.2)' 
            ref={(input) => this.titleInput = input}
            value={ this.state.meeting.title }
            onChangeText={(text) => this.setState({ 
              meeting: { 
                ...this.state.meeting,
                title: text
              }
            })
          } />

          <CurrentLocation onChangeLocation={(location) => this._changeLocation(location)} />
        </View>
        <View style={styles.actions}>
          <Button.White onPress={this._pickStartedDate} text={ started ? started.format('dddd, MMMM Do, YYYY h:mm A') : 'Choose Start Date' } />
          <Button.White onPress={this._pickFinishedDate} text={ finished ? finished.format('dddd, MMMM Do, YYYY h:mm A') : 'Choose End Date' } />

          <Text style={styles.actionText}>
            { finished && started && finished > started ? finished.twix(started).humanizeLength() : "" }
          </Text>

          <Text style={styles.errorText}>
            { this.state.error }
          </Text>

          <DateTimePicker
            mode="datetime"
            isVisible={this.state.pickStartedDate || this.state.pickFinishedDate}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />

          <Button.Black enabled={ finished && started && finished > started } onPress={() => this._save()} text='SAVE' />
          <Button.White onPress={() => this._cancel()} text='CANCEL' />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  infoContainer: {
    flexGrow: 1,
    padding: 20
  },
  meetingTitle: {
    fontSize: 36,
    fontWeight: '500',
    alignSelf: 'stretch',
    marginBottom: 10,
    padding: 5
  },
  map: {
    marginTop: 10
  },
  actionText: {
    fontSize: 24,
    padding: 20
  },
  errorText: {
    fontSize: 24,
    color: 'red'
  },
  actions: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
});

Create.propTypes = {
  user: PropTypes.object
};
