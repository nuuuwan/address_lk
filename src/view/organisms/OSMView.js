import {Component} from 'react';
import {MapContainer, TileLayer, Rectangle, useMapEvent, Tooltip} from 'react-leaflet';
import './OSMView.css';

const URL_FORMAT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ZOOM = 18;
const LATLNG_COLOMBO = [6.917257469436852, 79.86479649172456];

const QUANTUM = 36;

function logQ(x) {
  return Math.log(x) / Math.log(QUANTUM);
}

const K = Math.pow(QUANTUM, parseInt(logQ(10000)))

const [MIN_LAT, MIN_LNG, MAX_LAT, MAX_LNG] = [5.9, 79.5,9.9, 81.9];


function getAddressLabel(lat, lng, latLevel) {
  const steps = -logQ(latLevel);
  const nChars = Math.ceil(steps) +1;
  function format(x, offset) {
    return (x*K).toString(QUANTUM).substring(0, nChars + offset).toUpperCase();
  }
  return `${format(lat,0)}-${format(lng,1)}`;
}

export default class OSMView extends Component {
  constructor(props) {
    super(props);
    const [minLat, minLng, maxLat, maxLng] = [MIN_LAT, MIN_LNG, MAX_LAT, MAX_LNG];
    this.state = {minLat, minLng, maxLat, maxLng}
  }
  renderRectangles() {
    const {minLat, minLng, maxLat, maxLng} = this.state;
    const [latSpan, lngSpan] = [maxLat - minLat, maxLng - minLng];
    function getLevel(x) {
      return Math.pow(QUANTUM, Math.round(logQ(x),0));
    }
    const latLevel = getLevel(latSpan)
    const lngLevel = getLevel(lngSpan)
    const level = Math.min(latLevel, lngLevel);

    let lat0 = Math.round(minLat / level) * level;
    let lng0 = Math.round(minLng / level) * level;
    
    let renderedRectangles = [];
    for (let lat = lat0 - level; lat <= maxLat + level; lat += level) {
      for (let lng = lng0-level; lng <= maxLng+level; lng += level) {
        const bounds =[
          [lat, lng],
          [lat + latLevel, lng + level],
        ]
        const [midLat, midLng] = [(lat + latLevel/2), (lng + level/2)];
        
        if (midLat + level < MIN_LAT || midLat -level > MAX_LAT || midLng + level < MIN_LNG || midLng-level > MAX_LNG) {
          continue;
        }
        const label = getAddressLabel(midLat, midLng, level);
        renderedRectangles.push(
          <Rectangle
            bounds={bounds}
            color="red"
            weight={1}
          >
            <Tooltip direction="center">
          {label}
      </Tooltip>
            </Rectangle>
        );

      }
    }
    

    return renderedRectangles;
  }

  render() {
    const position = LATLNG_COLOMBO;

    const EventComponent = function() {
      const map = useMapEvent('move', () => {
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
