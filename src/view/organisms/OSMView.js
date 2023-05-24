import {Component} from 'react';
import {MapContainer, TileLayer, Rectangle, useMapEvent, SVGOverlay} from 'react-leaflet';
import './OSMView.css';
import NumberBase from '../../nonview/core/NumberBase.js';

const URL_FORMAT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ZOOM = 8;
const [MIN_LAT, MIN_LNG, MAX_LAT, MAX_LNG] = [5, 79, 10, 82];
const LATLNG_MID = [(MIN_LAT + MAX_LAT)/2, (MIN_LNG + MAX_LNG)/2];

const QUANTUM = 36;

function logQ(x) {
  return Math.log(x) / Math.log(QUANTUM);
}

const K = Math.pow(QUANTUM, parseInt(logQ(10000)))




function getAddressLabel(lat, lng, level) {
  const [nLat, nLng ]= [lat- MIN_LAT + 1, lng - MIN_LNG + 1];
  const steps = -logQ(level);
  const nChars = Math.ceil(steps) +1;
  function format(x) {
    return NumberBase.format(QUANTUM, x*K, nChars);
  }
  return `${format(nLat,0)}-${format(nLng,0)}`;
}

export default class OSMView extends Component {
  constructor(props) {
    super(props);
    const displayBounds = null;
    this.state = {displayBounds}
  }
  renderRectangles() {
    const {displayBounds} = this.state;
    if (!displayBounds) {
      return null;
    }
    console.log({displayBounds});
    const [[minLat , minLng] , [maxLat , maxLng]]= displayBounds;

    const [latSpan, lngSpan] = [maxLat - minLat, maxLng - minLng];
    function getLevel(x) {
      const K = Math.pow(QUANTUM, 0.2)
      return Math.pow(QUANTUM, Math.floor(logQ(x * K)));
    }

    const level = Math.min(getLevel(latSpan), getLevel(lngSpan));
    console.info({level})
    let lat0 = Math.round(minLat / level) * level;
    let lng0 = Math.round(minLng / level) * level;
    
    let renderedRectangles = [];
    for (let lat = lat0 - level; lat <= maxLat + level; lat += level) {
      for (let lng = lng0-level; lng <= maxLng+level; lng += level) {
        const key = `${lat}-${lng}-${level}`;
        const bounds =[
          [lat, lng],
          [lat + level, lng + level],
        ]
        const [midLat, midLng] = [(lat + level/2), (lng + level/2)];
        
        if (midLat < MIN_LAT || midLat > MAX_LAT || midLng  < MIN_LNG || midLng > MAX_LNG) {
          continue;
        }
        const label = getAddressLabel(midLat, midLng, level);
        renderedRectangles.push(
          <Rectangle
            bounds={bounds}
            color="red"
            weight={1}
            key={"rect-" +key}
          >
            
            </Rectangle>
        );
        renderedRectangles.push(
<SVGOverlay attributes={{ fill: 'black'}} bounds={bounds} key={"svg-" +key}>
      <text x="50%" y="50%" fontSize="12" textAnchor="middle">
        {label}
      </text>
    </SVGOverlay>
        );

      }
    }
    

    return renderedRectangles;
  }

  render() {
    const position = LATLNG_MID;

    const EventComponent = function() {
      const map = useMapEvent('move', () => {
        const bounds = map.getBounds();0
        const displayBounds = [[bounds._southWest.lat, bounds._southWest.lng], [bounds._northEast.lat, bounds._northEast.lng]]; 
       this.setState({displayBounds});
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
