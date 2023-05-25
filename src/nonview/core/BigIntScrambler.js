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
  36, 11, 33, 0, 37, 20, 14, 7, 18, 21, 12, 6, 5, 1, 23, 15, 10, 39, 35, 28, 27,
  40, 17, 8, 34, 3, 41, 29, 9, 4, 38, 13, 22, 30, 19, 25, 31, 32, 16, 2, 26, 24,
];

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
