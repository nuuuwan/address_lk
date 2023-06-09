import { N_SYMBOLS } from "../../nonview/core/NUMBER_SYMBOLS.js";

export const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const ZOOM = 18;
export const ZOOM_IN = 18;
export const [MIN_LAT, MIN_LNG, MAX_LAT, MAX_LNG] = [-90, -180, 90, 180];
export const [LAT_SPAN, LNG_SPAN] = [MAX_LAT - MIN_LAT, MAX_LNG - MIN_LNG];

console.info("LAT_SPAN", LAT_SPAN);
console.info("LNG_SPAN", LNG_SPAN);

export const LATLNG = {
  LIPTON_CIRCUS: [6.917272788217442, 79.8647961518609],
  BLUE_BRIDGE: [51.502347158795274, -0.1352271360745232],
  QUAILBRUKE: [47.3667788120173, 8.543102515699452],
  MEM_CHU: [37.42641463102428, -122.17062858224875],
  SRI_PADA: [6.809445575676784, 80.49944630902678],
};

export const BASE = N_SYMBOLS;
export const CHAR_COUNT = 4;
export const CHARS_PER_WORD = 5;
export const QUANTUM2 = Math.pow(BASE, CHAR_COUNT);
export const QUANTUM = parseInt(Math.sqrt(QUANTUM2));
console.info("QUANTUM", QUANTUM);
console.info("QUANTUM2", QUANTUM2);

export const LATS_PER_QUANT = LAT_SPAN / QUANTUM;
export const LNGS_PER_QUANT = LNG_SPAN / QUANTUM;

console.info("LATS_PER_QUANT", LATS_PER_QUANT);
console.info("LNGS_PER_QUANT", LNGS_PER_QUANT);

export const BACKGROUND_COLORS = ["white", "#7c7c7c", "#ccb45d", "#6aaa64"];
export const COLORS = ["black", "white", "white", "white"];
