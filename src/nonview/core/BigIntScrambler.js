import { N_SYMBOLS } from "./NUMBER_SYMBOLS.js";
import NumberBase from "./NumberBase.js";
import { CHAR_COUNT } from "./constants.js";

const BASE_SCRAMBLER = 2;
const IS_SCRAMBLER_ENABLED = true;
function getMaxDigits() {
  return parseInt(
    CHAR_COUNT * Math.round(Math.log(N_SYMBOLS) / Math.log(BASE_SCRAMBLER))
  );
}

const MAX_DIGITS = getMaxDigits();
console.info("MAX_DIGITS", MAX_DIGITS);

// function getShuffleMapIdx(n) {
//   const n2 = parseInt(n / 2);
//   let mapIdx = [];
//   for (let i = 0; i < n2; i++) {
//     mapIdx.push(i);
//     mapIdx.push(i + n2);
//   }
//   if (n % 2 === 1) {
//     mapIdx.push(n - 1);
//   }
//   return mapIdx;
// }

const CUSTOM_SHUFFLE_MAP = [
  0, 19, 14, 21, 22, 17, 33, 30, 7, 5, 10, 13, 35, 1, 28, 23, 8, 3, 20, 27, 4,
  32, 6, 18, 11, 15, 9, 34, 25, 29, 12, 31, 16, 2, 26, 24,
];

if (CUSTOM_SHUFFLE_MAP.length !== MAX_DIGITS) {
  throw new Error("CUSTOM_SHUFFLE_MAP.length !== MAX_DIGITS");
}

function invertMapIdx(mapIdx) {
  let invMapIdx = [];
  for (let i = 0; i < mapIdx.length; i++) {
    invMapIdx[mapIdx[i]] = i;
  }
  return invMapIdx;
}

const SHUFFLE_MAP_IDX = CUSTOM_SHUFFLE_MAP;
const INV_SHUFFLE_MAP_IDX = invertMapIdx(SHUFFLE_MAP_IDX);

export default class BigIntScrambler {
  static scramble(x) {
    if (!IS_SCRAMBLER_ENABLED) return x;
    const digits = NumberBase.getDigits(x, BASE_SCRAMBLER, MAX_DIGITS);
    const scrambledDigits = digits
      .map((_, i) => digits[SHUFFLE_MAP_IDX[i]])
      .reverse();
    return NumberBase.getX(scrambledDigits, BASE_SCRAMBLER);
  }

  static unscramble(x) {
    if (!IS_SCRAMBLER_ENABLED) return x;
    const digits = NumberBase.getDigits(x, BASE_SCRAMBLER, MAX_DIGITS);
    const unscrambledDigits = digits
      .reverse()
      .map((_, i) => digits[INV_SHUFFLE_MAP_IDX[i]]);
    return NumberBase.getX(unscrambledDigits, BASE_SCRAMBLER);
  }
}
