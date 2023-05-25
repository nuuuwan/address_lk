import { Rectangle } from "react-leaflet";
import { LATS_PER_QUANT, LNGS_PER_QUANT } from "../../nonview/core/constants";

export default function BoundsRectangle({ displayCenter }) {
  const rectBounds = [
    [
      displayCenter[0] - LATS_PER_QUANT / 2,
      displayCenter[1] - LNGS_PER_QUANT / 2,
    ],
    [
      displayCenter[0] + LATS_PER_QUANT / 2,
      displayCenter[1] + LNGS_PER_QUANT / 2,
    ],
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
