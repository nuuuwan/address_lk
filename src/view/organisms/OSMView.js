import {Component} from 'react';
import {MapContainer, TileLayer, Rectangle, useMapEvent} from 'react-leaflet';
import './OSMView.css';

const URL_FORMAT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ZOOM = 18;
const LATLNG_COLOMBO = [6.917257469436852, 79.86479649172456];


const [MIN_LAT, MIN_LNG, MAX_LAT, MAX_LNG] = [6.91, 79.86, 6.92, 79.87];
    

export default class OSMView extends Component {
  constructor(props) {
    super(props);
    const [minLat, minLng, maxLat, maxLng] = [MIN_LAT, MIN_LNG, MAX_LAT, MAX_LNG];
    this.state = {minLat, minLng, maxLat, maxLng}
  }
  renderRectangles() {
    const {minLat, minLng, maxLat, maxLng} = this.state;
    const [latSpan, lngSpan] = [maxLat - minLat, maxLng - minLng];
    const latLevel = Math.pow(2, Math.round(Math.log2(latSpan),0)-1);
    const lngLevel = Math.pow(2,Math.round(Math.log2(lngSpan),0)-1);
    
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

    const EventComponent = function() {
      const map = useMapEvent('click', () => {
        const bounds = map.getBounds();0
        const  [minLat, minLng, maxLat, maxLng] = [bounds._southWest.lat, bounds._southWest.lng, bounds._northEast.lat, bounds._northEast.lng]; 
       console.log(minLat, minLng, maxLat, maxLng);
       this.setState({minLat, minLng, maxLat, maxLng});
      });
      return null
    }.bind(this);


    return (
      <MapContainer center={position} zoom={ZOOM} scrollWheelZoom={true}>
        <TileLayer
          url={URL_FORMAT}
        />
        {this.renderRectangles()}
        <EventComponent/>
      </MapContainer>
    );
  }
}
