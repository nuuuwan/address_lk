import { Rectangle } from "react-leaflet";
import { LATS_PER_QUANT, LNGS_PER_QUANT } from "../../nonview/core/constants";
import LatLngToWord from "../../nonview/core/LatLngToWord";

function SingleRectangle({ nLat0, nLng0, dlat, dlng }) {
  const nLat = nLat0 + dlat * LATS_PER_QUANT;
  const nLng = nLng0 + dlng * LNGS_PER_QUANT;

  const rectBounds = [
    [nLat - LATS_PER_QUANT / 2, nLng - LNGS_PER_QUANT / 2],
    [nLat + LATS_PER_QUANT / 2, nLng + LNGS_PER_QUANT / 2],
  ];

  const color = dlat == 0 && dlng == 0 ? "red" : "gray";
  const fillColor = "none";
  const pathOptions = { fillColor, color, weight: 1 };

  return <Rectangle bounds={rectBounds} pathOptions={pathOptions} />;
}

export default function BoundsRectangle({ displayCenter }) {
  const [nLat0, nLng0] = LatLngToWord.normalizeLatLng(displayCenter);

  const radius = 1;
  let renderedRectangles = [];

  for (let dlat = -radius; dlat <= radius; dlat++) {
    for (let dlng = -radius; dlng <= radius; dlng++) {
      if (dlat == 0 && dlng == 0) continue;

      renderedRectangles.push(
        <SingleRectangle nLat0={nLat0} nLng0={nLng0} dlat={dlat} dlng={dlng} />
      );
    }
  }

  renderedRectangles.push(
    <SingleRectangle nLat0={nLat0} nLng0={nLng0} dlat={0} dlng={0} />
  );

  return renderedRectangles;
}
