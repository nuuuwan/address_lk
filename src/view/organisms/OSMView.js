import { Component } from "react";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";

import {
  LATLNG_LIPTON_CIRCUS,
  ZOOM,
  URL_FORMAT,
} from "../../nonview/core/constants";
import LatLngToWord from "../../nonview/core/LatLngToWord";
import CenterTargetView from "../atoms/CenterTargetView";
import WordleGrid from "../molecules/WordleGrid";

import "./OSMView.css";

export default class OSMView extends Component {
  constructor(props) {
    super(props);
    const displayCenter = LATLNG_LIPTON_CIRCUS;
    const displayLabel = LatLngToWord.getWord(displayCenter);
    const isDisplayLabelValid = true;
    this.state = { displayCenter, displayLabel, isDisplayLabelValid };
  }

  onChangeLabel(displayLabel) {
    const newDisplayCenter = LatLngToWord.getLatLng(displayLabel);
    let isDisplayLabelValid = false;
    let displayCenter = this.state.displayCenter;
    if (newDisplayCenter) {
      isDisplayLabelValid = true;
      displayCenter = newDisplayCenter;
    }
    this.setState({ displayLabel, displayCenter, isDisplayLabelValid });
  }

  onChangeDisplayCenter(displayCenter) {
    const displayLabel = LatLngToWord.getWord(displayCenter);
    const isDisplayLabelValid = true;
    this.setState({ displayCenter, displayLabel, isDisplayLabelValid });
  }

  render() {
    const { displayCenter, displayLabel, isDisplayLabelValid } = this.state;

    const EventComponent = function () {
      const map = useMapEvent("dragend", () => {
        const center = map.getCenter();
        const displayCenter = [center.lat, center.lng];
        this.onChangeDisplayCenter(displayCenter);
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

        <div className="bottom-panel">
          <WordleGrid
            displayLabel={displayLabel}
            isDisplayLabelValid={isDisplayLabelValid}
            onChangeLabel={this.onChangeLabel.bind(this)}
          />
        </div>
      </>
    );
  }
}
