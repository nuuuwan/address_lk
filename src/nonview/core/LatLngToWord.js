import {
  MIN_LAT,
  MIN_LNG,
  LAT_SPAN,
  LNG_SPAN,
  BASE,
  QUANTUM,
} from "./constants.js";
import NumberBase from "./NumberBase.js";

export default class LatLngToWord {
  static latLngToBigInt([lat, lng]) {
    const pLat = (lat - MIN_LAT) / LAT_SPAN;
    const pLng = (lng - MIN_LNG) / LNG_SPAN;
    return parseInt(parseInt(pLat * QUANTUM) * QUANTUM + pLng * QUANTUM);
  }

  static bigIntToLatLng(n) {
    const pLat = parseInt(n / QUANTUM) / QUANTUM;
    const pLng = parseInt(n % QUANTUM) / QUANTUM;
    const lat = MIN_LAT + pLat * LAT_SPAN;
    const lng = MIN_LNG + pLng * LNG_SPAN;
    return [lat, lng];
  }

  static getWord([lat, lng]) {
    const n = LatLngToWord.latLngToBigInt([lat, lng]);
    return NumberBase.stringify(n, BASE);
  }

  static getLatLng(word) {
    const n = NumberBase.parse(word, BASE);
    return LatLngToWord.bigIntToLatLng(n);
  }
}
