import {
  MAX_LAT,
  MIN_LAT,
  MAX_LNG,
  MIN_LNG,
  BASE,
  QUANTUM,
} from "./constants.js";
import NumberBase from "./NumberBase.js";
export default class LatLngToWord {
  static getWord([lat, lng]) {
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
}
