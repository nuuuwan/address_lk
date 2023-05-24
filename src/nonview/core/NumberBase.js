import { NUMBER_SYMBOLS, N_SYMBOLS } from "./NUMBER_SYMBOLS.js";

export default class NumberBase {
  static format(x, base) {
    let factors = [];
    let r = x;
    while (r > 0) {
      factors.push(r % base);
      r = Math.floor(r / base);
    }
    return factors
      .reverse()
      .map((f) => NUMBER_SYMBOLS[parseInt((f * N_SYMBOLS) / base)])
      .join("");
  }
}
