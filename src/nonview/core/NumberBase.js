import { NUMBER_SYMBOLS, N_SYMBOLS } from "./NUMBER_SYMBOLS.js";
import { CHARS_PER_WORD, CHAR_COUNT } from "./constants.js";

export default class NumberBase {
  static getDigits(x, base) {
    let digits = [];
    let r = x;
    while (r > 0) {
      const digit = r % base;
      digits.push(digit);
      r = Math.floor(r / base);
    }
    return digits.reverse();
  }

  static getX(digits, base) {
    let x = 0;
    for (var i = 0; i < digits.length; i++) {
      x += digits[i] * Math.pow(base, digits.length - i - 1);
    }
    return x;
  }

  static stringify(x, base) {
    const digits = NumberBase.getDigits(x, base);
    return digits
      .map((f) => NUMBER_SYMBOLS[parseInt((f * N_SYMBOLS) / base)])
      .join("");
  }

  static parse(s, base) {
    let digits = [];
    for (var i = 0; i < CHAR_COUNT; i++) {
      const iStart = i * CHARS_PER_WORD;
      const symbol = s.substring(iStart, iStart + CHARS_PER_WORD);
      const digit = NUMBER_SYMBOLS.indexOf(symbol);
      digits.push(digit);
    }
    return NumberBase.getX(digits, base);
  }
}
