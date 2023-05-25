const BASE_SCRAMBLER = 2;
const MAX_DIGITS = 46;
import NumberBase from "./NumberBase.js";

function getShuffleMapIdx(n) {
  const n2 = parseInt(n / 2);
  let mapIdx = [];
  for (let i = 0; i < n2; i++) {
    mapIdx.push(i);
    mapIdx.push(i + n2);
  }
  return mapIdx;
}

function invertMapIdx(mapIdx) {
  let invMapIdx = [];
  for (let i = 0; i < mapIdx.length; i++) {
    invMapIdx[mapIdx[i]] = i;
  }
  return invMapIdx;
}

const SHUFFLE_MAP_IDX = getShuffleMapIdx(MAX_DIGITS);
const INV_SHUFFLE_MAP_IDX = invertMapIdx(SHUFFLE_MAP_IDX);

export default class BigIntScrambler {
  static scramble(x) {
    const digits = NumberBase.getDigits(x, BASE_SCRAMBLER, MAX_DIGITS);
    const scrambledDigits = digits.map((_, i) => digits[SHUFFLE_MAP_IDX[i]]);
    return NumberBase.getX(scrambledDigits, BASE_SCRAMBLER);
  }

  static unscramble(x) {
    const digits = NumberBase.getDigits(x, BASE_SCRAMBLER, MAX_DIGITS);
    const unscrambledDigits = digits.map(
      (_, i) => digits[INV_SHUFFLE_MAP_IDX[i]]
    );
    return NumberBase.getX(unscrambledDigits, BASE_SCRAMBLER);
  }
}
