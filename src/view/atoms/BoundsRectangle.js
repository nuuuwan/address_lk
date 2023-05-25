import { Rectangle } from "react-leaflet";
import { LATS_PER_QUANT, LNGS_PER_QUANT } from "../../nonview/core/constants";
import LatLngToWord from "../../nonview/core/LatLngToWord";

export default function BoundsRectangle({ displayCenter }) {
  const [nLat, nLng] = LatLngToWord.normalizeLatLng(displayCenter);
  const rectBounds = [
    [nLat - LATS_PER_QUANT / 2, nLng - LNGS_PER_QUANT / 2],
    [nLat + LATS_PER_QUANT / 2, nLng + LNGS_PER_QUANT / 2],
  ];

  return (
    <Rectangle
      bounds={rectBounds}
      fill={"red"}
      stroke="red"
      fillOpacity={0.2}
    />
  );
}
