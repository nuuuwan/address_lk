import { Component } from "react";
import { MapContainer, TileLayer, useMapEvent, Marker } from "react-leaflet";

import {
  LATLNG_LIPTON_CIRCUS,
  ZOOM,
  URL_FORMAT,
  CHAR_COUNT,
  BACKGROUND_COLORS,
  COLORS,
} from "../../nonview/core/constants";
import LatLngToWord from "../../nonview/core/LatLngToWord";
import "./OSMView.css";

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

    const label = LatLngToWord.getWord(displayCenter);
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
