import { NUMBER_SYMBOLS, N_SYMBOLS } from "./NUMBER_SYMBOLS.js";
import { CHARS_PER_WORD, CHAR_COUNT } from "./constants.js";

export default class NumberBase {
  static getDigits(x, base, max_digits = 0) {
    let digits = [];
    let r = x;
    while (r > 0) {
      const digit = r % base;
      digits.push(digit);
      r = Math.floor(r / base);
    }

    if (digits.length < max_digits) {
      const r = max_digits - digits.length;
      for (let i = 0; i < r; i++) {
        digits.push(0);
      }
    }

    digits = digits.reverse();

    return digits;
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

    const s = digits
      .map((f) => NUMBER_SYMBOLS[parseInt((f * N_SYMBOLS) / base)])
      .join("");

    return s;
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
