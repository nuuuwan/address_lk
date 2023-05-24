import { Component } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvent,
  SVGOverlay,
} from "react-leaflet";
import "./OSMView.css";
import NumberBase from "../../nonview/core/NumberBase.js";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const ZOOM = 16;
const [MIN_LAT, MIN_LNG, MAX_LAT, MAX_LNG] = [5, 79, 10, 82];
const LATLNG_LIPTON_CIRCUS = [6.917272788217442, 79.8647961518609];

function getLabel([lat, lng]) {
  const [spanLat, spanLng] = [MAX_LAT - MIN_LAT, MAX_LNG - MIN_LNG];
  const maxSpan = Math.max(spanLat, spanLng);

  const [pLat, pLng] = [(lat - MIN_LAT) / maxSpan, (lng - MIN_LNG) / maxSpan];
  const [maxPLat, maxPLng] = [spanLat / maxSpan, spanLng / maxSpan];

  if (!(0 < pLat && pLat < maxPLat && 0 < pLng && pLng < maxPLng)) {
    return "";
  }

  const BASE = 512;
  const CHAR_COUNT = 3;
  const QUANTUM2 = Math.pow(BASE, CHAR_COUNT);
  const QUANTUM = Math.sqrt(QUANTUM2);
  const DEGREES_PER_SYMBOL = maxSpan / QUANTUM;
  console.info({ DEGREES_PER_SYMBOL });

  const n = parseInt(parseInt(pLat * QUANTUM) * QUANTUM + pLng * QUANTUM);
  const s = NumberBase.format(n, BASE);
  return `${s}`;
}

export default class OSMView extends Component {
  constructor(props) {
    super(props);
    const displayBounds = null;
    const displayCenter = LATLNG_LIPTON_CIRCUS;
    this.state = { displayBounds, displayCenter };
  }

  renderCenter() {
    const { displayCenter, displayBounds } = this.state;

    if (!displayBounds) {
      return null;
    }

    const label = getLabel(displayCenter);
    const key = "center-" + displayCenter.join("-");

    return (
      <SVGOverlay key={key} bounds={displayBounds}>
        <circle cx="50%" cy="50%" r="10" fill="red" />
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="24"
          fontFamily="Fjalla One"
        >
          {label}
        </text>
      </SVGOverlay>
    );
  }

  render() {
    const { displayCenter } = this.state;
    const EventComponent = function () {
      const map = useMapEvent("move", () => {
        const bounds = map.getBounds();
        const displayBounds = [
          [bounds._southWest.lat, bounds._southWest.lng],
          [bounds._northEast.lat, bounds._northEast.lng],
        ];
        const center = map.getCenter();
        const displayCenter = [center.lat, center.lng];
        this.setState({ displayBounds, displayCenter });
      });
      return null;
    }.bind(this);

    return (
      <MapContainer center={displayCenter} zoom={ZOOM} scrollWheelZoom={true}>
        <TileLayer url={URL_FORMAT} />
        {this.renderCenter()}
        <EventComponent />
      </MapContainer>
    );
  }
}
