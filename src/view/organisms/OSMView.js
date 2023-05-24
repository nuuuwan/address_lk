import { Component } from "react";
import { MapContainer, TileLayer, useMapEvent, Marker } from "react-leaflet";
import "./OSMView.css";
import NumberBase from "../../nonview/core/NumberBase.js";
import { N_SYMBOLS } from "../../nonview/core/NUMBER_SYMBOLS.js";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const ZOOM = 18;
const [MIN_LAT, MIN_LNG, MAX_LAT, MAX_LNG] = [-85, -180, 85, 180];
const LATLNG_LIPTON_CIRCUS = [6.917272788217442, 79.8647961518609];

const BASE = N_SYMBOLS;
const CHAR_COUNT = 4;
const QUANTUM2 = Math.pow(BASE, CHAR_COUNT);
const QUANTUM = Math.sqrt(QUANTUM2);

const BACKGROUND_COLORS = ["white", "#7c7c7c", "#ccb45d", "#6aaa64"];
const COLORS = ["black", "white", "white", "white"];

function getLabel([lat, lng]) {
  const [spanLat, spanLng] = [MAX_LAT - MIN_LAT, MAX_LNG - MIN_LNG];

  const [pLat, pLng] = [
    1 - (lat - MIN_LAT) / spanLat,
    (lng - MIN_LNG) / spanLng,
  ];

  if (!(0 < pLat && pLat < 1 && 0 < pLng && pLng < 1)) {
    return "";
  }

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
    const { displayCenter } = this.state;

    return <Marker position={displayCenter}></Marker>;
  }

  renderLabel() {
    const { displayCenter } = this.state;

    const label = getLabel(displayCenter);
    if (label.length === 0) {
      return null;
    }
    var renderedLabelItems = [];
    for (var j = 0; j < CHAR_COUNT; j++) {
      var i_color;
      var inner = [];
      for (var i = 0; i < 5; i++) {
        const c = label.charAt(5 * j + i);
        if (c === label.charAt(5 * (CHAR_COUNT - 1) + i)) {
          i_color = 3;
        } else if (label.substring(5 * (CHAR_COUNT - 1)).includes(c)) {
          i_color = 2;
        } else {
          i_color = 1;
        }

        const backgroundColor = BACKGROUND_COLORS[i_color];
        const color = COLORS[i_color];

        inner.push(
          <span
            key={`span-${j}-${i}`}
            className="label-item"
            style={{ color, backgroundColor, borderColor: color }}
          >
            {c}
          </span>
        );
      }
      renderedLabelItems.push(<div key={`span-${j}`}>{inner}</div>);
    }
    return renderedLabelItems;
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
      <>
        <MapContainer center={displayCenter} zoom={ZOOM} scrollWheelZoom={true}>
          <TileLayer url={URL_FORMAT} />
          {this.renderCenter()}
          <EventComponent />
        </MapContainer>
        <div className="bottom-panel">{this.renderLabel()}</div>
      </>
    );
  }
}
