import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={15}
                style={{width:'66%',height:'60%'}}
                initialCenter={{lat: this.props.coordinates.latitude,lng: this.props.coordinates.longitude}}
            >
                <Marker position={{lat: this.props.coordinates.latitude, lng: this.props.coordinates.longitude}} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDQ9jA1MXE_4xXeI9RnpC90YKgO-Z1GlKc'
})(MapContainer);