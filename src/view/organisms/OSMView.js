import {Component} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import './OSMView.css';

const URL_FORMAT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ZOOM = 18;
const LATLNG_COLOMBO = [6.917257469436852, 79.86479649172456];

export default class OSMView extends Component {
  render() {
    const position = LATLNG_COLOMBO;
    return (
      <MapContainer center={position} zoom={ZOOM} scrollWheelZoom={false}>
        <TileLayer
          url={URL_FORMAT}
        />
      </MapContainer>
    );
  }
}
