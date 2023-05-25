import BigIntScrambler from "./BigIntScrambler.js";
import {
  MIN_LAT,
  MIN_LNG,
  LAT_SPAN,
  LNG_SPAN,
  BASE,
  QUANTUM,
  LATLNG_LIPTON_CIRCUS,
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
    const scrambledN = BigIntScrambler.scramble(n);
    return NumberBase.stringify(scrambledN, BASE);
  }

  static getLatLng(word) {
    const scrambledBigInt = NumberBase.parse(word, BASE);
    const n = BigIntScrambler.unscramble(scrambledBigInt);
    const latLng = LatLngToWord.bigIntToLatLng(n);
    if (isNaN(latLng[0]) || isNaN(latLng[1])) {
      return null;
    }
    return latLng;
  }
}

for (var latlng of [LATLNG_LIPTON_CIRCUS]) {
  const word = LatLngToWord.getWord(latlng);
  const latLng2 = LatLngToWord.getLatLng(word);
  const word2 = LatLngToWord.getWord(latLng2);
  console.info({ LATLNG_LIPTON_CIRCUS, word, latLng2, word2 });
}
