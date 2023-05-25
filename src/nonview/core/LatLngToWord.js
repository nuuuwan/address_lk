import BigIntScrambler from "./BigIntScrambler.js";
import {
  MIN_LAT,
  MIN_LNG,
  LAT_SPAN,
  LNG_SPAN,
  BASE,
  QUANTUM,
  LATLNG,
  LATS_PER_QUANT,
  LNGS_PER_QUANT,
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

  static normalizeLatLng([lat, lng]) {
    const nLat = Math.floor(lat / LATS_PER_QUANT) * LATS_PER_QUANT;
    const nLng = Math.floor(lng / LNGS_PER_QUANT) * LNGS_PER_QUANT;
    return [nLat, nLng];
  }
}

for (var [name, latlng] of Object.entries(LATLNG)) {
  const word = LatLngToWord.getWord(latlng);
  const latLng2 = LatLngToWord.getLatLng(word);
  const word2 = LatLngToWord.getWord(latLng2);
  console.info({ name, latlng, word, latLng2, word2 });
}
