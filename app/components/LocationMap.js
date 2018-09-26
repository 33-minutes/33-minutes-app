import React, { Component } from 'react';
import { MapView, Location } from 'expo';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class LocationMap extends Component {
  render() {
    if (this.props.location) {
      return <MapView
        style={[ this.props.style, styles.map ]}
        initialRegion={{
          latitude: this.props.location.latitude,
          longitude: this.props.location.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        }}
      >
        <MapView.Marker coordinate={ this.props.location } />
      </MapView>
    } else {
      return <View style={ styles.map } />
    }
  }
}

Location.propTypes = {
  style: PropTypes.style,
  location: PropTypes.array 
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
});
