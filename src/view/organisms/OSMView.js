import {Component} from 'react';
import {MapContainer, TileLayer, Rectangle} from 'react-leaflet';
import './OSMView.css';

const URL_FORMAT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ZOOM = 18;
const LATLNG_COLOMBO = [6.917257469436852, 79.86479649172456];

export default class OSMView extends Component {
  renderRectangles() {
    const [minLat, minLng, maxLat, maxLng] = [6.91, 79.86, 6.92, 79.87];
    const [latSpan, lngSpan] = [maxLat - minLat, maxLng - minLng];
    const latLevel = Math.pow(10, Math.round(Math.log10(latSpan),0)-1);
    const lngLevel = Math.pow(10,Math.round(Math.log10(lngSpan),0)-1);
    
    let lat0 = Math.round(minLat / latLevel) * latLevel;
    let lng0 = Math.round(minLng / lngLevel) * lngLevel;
    
    let renderedRectangles = [];
    for (let lat = lat0; lat < maxLat; lat += latLevel) {
      for (let lng = lng0; lng < maxLng; lng += lngLevel) {
        renderedRectangles.push(
          <Rectangle
            bounds={[
              [lat, lng],
              [lat + latLevel, lng + lngLevel],
            ]}
            color="red"
            weight={1}
          />
        );
      }
    }
    

    return renderedRectangles;
  }

  render() {
    const position = LATLNG_COLOMBO;
    return (
      <MapContainer center={position} zoom={ZOOM} scrollWheelZoom={false}>
        <TileLayer
          url={URL_FORMAT}
        />
        {this.renderRectangles()}
      </MapContainer>
    );
  }
}
