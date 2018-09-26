import React, { Component } from 'react';
import { Constants, Location, Permissions } from 'expo';
import { Platform, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import LocationMap from './LocationMap'

export default class CurrentLocation extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Location services unavailable in Sketch or the Android emulator.',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied.',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({ location: location.coords });

    if (typeof this.props.onChangeLocation === 'function') {
      this.props.onChangeLocation(location.coords);
    }
  };
  
  render() {
    if (this.state.errorMessage) {
      return <Text style={styles.text}>{ this.state.errorMessage }</Text>
    } else if (this.state.location) {
      return <LocationMap location={ this.state.location } />
    } else {
      return <Text style={styles.text}>Loading ...</Text>
    }
  }
}

CurrentLocation.propTypes = {
  onChangeLocation: PropTypes.func 
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  text: {
    color: 'grey' 
  }
});
