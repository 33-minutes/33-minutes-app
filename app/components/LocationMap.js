import React, { Component } from 'react';
import { MapView, Location } from 'expo';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class LocationMap extends Component {
  state = {
    location: null,
    readOnly: true
  };

  componentWillMount() {
    this.setState({
      location: this.props.location,
      readOnly: this.props.readOnly
    });
  }

  render() {
    if (this.state.location) {
      return <MapView
        style={[ this.props.style, styles.map ]}
        initialRegion={{
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onRegionChange={this._handleMapRegionChange}
      >
        <MapView.Marker 
          tracksViewChanges={false} 
          coordinate={ this.state.location } 
        />
      </MapView>
    } else {
      return <View style={ styles.map } />
    }
  }

  _handleMapRegionChange = mapRegion => {
    if (! this.state.readOnly) {
      newLocation = { 
        latitude: mapRegion.latitude, 
        longitude: mapRegion.longitude 
      };

      this.setState({ location: newLocation});

      if (typeof this.props.onChangeLocation === 'function') {
        this.props.onChangeLocation(newLocation);
      }
    }
  }
}

Location.propTypes = {
  style: PropTypes.style,
  location: PropTypes.array,
  readOnly: PropTypes.bool,
  onChangeLocation: PropTypes.func 
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
});
