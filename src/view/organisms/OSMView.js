import { Component } from "react";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";

import {
  LATLNG_LIPTON_CIRCUS,
  ZOOM,
  URL_FORMAT,
  CHAR_COUNT,
  BACKGROUND_COLORS,
  COLORS,
} from "../../nonview/core/constants";
import LatLngToWord from "../../nonview/core/LatLngToWord";
import CenterTargetView from "../atoms/CenterTargetView";
import "./OSMView.css";

export default class OSMView extends Component {
  constructor(props) {
    super(props);
    this.state = { displayCenter: LATLNG_LIPTON_CIRCUS };
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
        const charLoc = 5 * j + i;
        const c = label.charAt(charLoc);
        if (c === label.charAt(5 * (CHAR_COUNT - 1) + i)) {
          i_color = 3;
        } else if (label.substring(5 * (CHAR_COUNT - 1)).includes(c)) {
          i_color = 2;
        } else {
          i_color = 1;
        }

        const onChange = function (event) {
          const newLabel =
            label.substring(0, charLoc) +
            event.target.value +
            label.substring(charLoc + 1);
          const newDisplayCenter = LatLngToWord.getLatLng(newLabel);

          if (newDisplayCenter) {
            this.setState({ displayCenter: newDisplayCenter });
          }
        }.bind(this);

        const backgroundColor = BACKGROUND_COLORS[i_color];
        const color = COLORS[i_color];
        inner.push(
          <input
            type="text"
            key={`input-${j}-${i}`}
            className="input-char"
            style={{ color, backgroundColor, borderColor: color }}
            value={c}
            onChange={onChange}
          />
        );
      }
      renderedLabelItems.push(<div key={`span-${j}`}>{inner}</div>);
    }
    return renderedLabelItems;
  }

  render() {
    const { displayCenter } = this.state;
    const EventComponent = function () {
      const map = useMapEvent("dragend", () => {
        const center = map.getCenter();
        const displayCenter = [center.lat, center.lng];
        this.setState({ displayCenter });
      });
      return null;
    }.bind(this);

    const key = `map-${displayCenter[0]}-${displayCenter[1]}`;

    return (
      <>
        {<CenterTargetView />}

        <MapContainer
          key={key}
          center={displayCenter}
          zoom={ZOOM}
          scrollWheelZoom={true}
        >
          <TileLayer url={URL_FORMAT} />
          <EventComponent />
        </MapContainer>

        <div className="bottom-panel">{this.renderLabel()}</div>
      </>
    );
  }
}
