
import NUMBER_SYMBOLS  from "./NUMBER_SYMBOLS";
export default class NumberBase {
    static format(base, x, nChars) {
        let basic =  x.toString(base).toUpperCase().substring(0, nChars);
        for (let i = 0; i < base; i++) {
            const symbol = NUMBER_SYMBOLS[i] +  ' ';
            const digit = i.toString(base).toUpperCase();
            basic = basic.replaceAll(digit, symbol);
        }
        return basic;
    }
}