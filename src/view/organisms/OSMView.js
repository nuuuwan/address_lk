import { Component } from "react";
import { MapContainer, TileLayer, useMapEvent } from "react-leaflet";

import {
  LATLNG,
  ZOOM,
  ZOOM_IN,
  URL_FORMAT,
  CHAR_COUNT,
  CHARS_PER_WORD,
} from "../../nonview/core/constants";
import LatLngToWord from "../../nonview/core/LatLngToWord";
import CenterTargetView from "../atoms/CenterTargetView";
import WordleGrid from "../molecules/WordleGrid";
import BoundsRectangle from "../atoms/BoundsRectangle";

import "./OSMView.css";

export default class OSMView extends Component {
  constructor(props) {
    super(props);
    const displayCenter = LATLNG.LIPTON_CIRCUS;
    const displayLabel = LatLngToWord.getWord(displayCenter);
    const isDisplayLabelValid = true;
    const activeWordleSquareIndex = 0;
    const displayZoom = ZOOM;
    this.state = {
      displayCenter,
      displayLabel,
      isDisplayLabelValid,
      activeWordleSquareIndex,
      displayZoom,
    };
  }

  onChangeLabel(displayLabel, charLoc) {
    const newDisplayCenter = LatLngToWord.getLatLng(displayLabel);
    let isDisplayLabelValid = false;
    let displayCenter = this.state.displayCenter;
    if (newDisplayCenter) {
      isDisplayLabelValid = true;
      displayCenter = newDisplayCenter;
    }

    const activeWordleSquareIndex =
      (charLoc + 1) % (CHARS_PER_WORD * CHAR_COUNT);
    this.setState(
      {
        displayLabel,
        displayCenter,
        isDisplayLabelValid,
        activeWordleSquareIndex,
        displayZoom: ZOOM_IN,
      },
      function () {
        this.focusActiveWordleSquare();
      }.bind(this)
    );
  }

  onChangeDisplayCenter(displayCenter, displayZoom) {
    const displayLabel = LatLngToWord.getWord(displayCenter);
    const isDisplayLabelValid = true;
    this.setState({
      displayCenter,
      displayLabel,
      isDisplayLabelValid,
      displayZoom,
    });
  }

  focusActiveWordleSquare() {
    const { activeWordleSquareIndex } = this.state;
    const wordleSquareElems = document.getElementsByClassName(
      "wordle-square-input"
    );
    const wordleSquareElem = wordleSquareElems[activeWordleSquareIndex];
    wordleSquareElem.select();
  }

  render() {
    const { displayCenter, displayLabel, isDisplayLabelValid, displayZoom } =
      this.state;

    const EventComponent = function () {
      const map = useMapEvent("dragend", () => {
        const center = map.getCenter();
        const displayCenter = [center.lat, center.lng];
        const displayZoom = map.getZoom();
        this.onChangeDisplayCenter(displayCenter, displayZoom);
      });
      return null;
    }.bind(this);

    const key = `map-${displayCenter[0]}-${displayCenter[1]}-${displayZoom}`;

    return (
      <>
        {<CenterTargetView />}

        <MapContainer
          key={key}
          center={displayCenter}
          zoom={displayZoom}
          scrollWheelZoom={true}
        >
          <TileLayer url={URL_FORMAT} />
          <EventComponent />
          <BoundsRectangle displayCenter={displayCenter} />
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
