import {
  MAX_LAT,
  MIN_LAT,
  MAX_LNG,
  MIN_LNG,
  BASE,
  QUANTUM,
  CHAR_COUNT,
  CHARS_PER_WORD,
} from "./constants.js";
import NumberBase from "./NumberBase.js";
import { NUMBER_SYMBOLS } from "./NUMBER_SYMBOLS.js";

function getNumberSymbolToIndex() {
  const idx = {};
  for (var i = 0; i < NUMBER_SYMBOLS.length; i++) {
    idx[NUMBER_SYMBOLS[i]] = i;
  }
  return idx;
}
const NUMBER_SYMBOL_TO_INDEX = getNumberSymbolToIndex();

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

  static getLatLng(word) {
    let n = 0;
    for (var i = 0; i < CHAR_COUNT; i++) {
      const iStart = i * CHARS_PER_WORD;
      const subWord = word.substring(iStart, iStart + CHARS_PER_WORD);
      const v = NUMBER_SYMBOL_TO_INDEX[subWord];
      n += v * Math.pow(BASE, CHAR_COUNT - i - 1);
    }

    const pLat = parseInt(n / QUANTUM) / QUANTUM;
    const pLng = parseInt(n % QUANTUM) / QUANTUM;
    const lat = MIN_LAT + (1 - pLat) * (MAX_LAT - MIN_LAT);
    const lng = MIN_LNG + pLng * (MAX_LNG - MIN_LNG);
    return [lat, lng];
  }
}

LatLngToWord.getLatLng("ENTERVULVAUSINGPENIS");
