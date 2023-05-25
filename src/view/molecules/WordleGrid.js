import {
  CHAR_COUNT,
  BACKGROUND_COLORS,
  COLORS,
  CHARS_PER_WORD,
} from "../../nonview/core/constants.js";

import WordleSquare from "../atoms/WordleSquare.js";

export default function WordleGrid({
  displayLabel,
  isDisplayLabelValid,
  onChangeLabel,
}) {
  if (displayLabel.length === 0) {
    return null;
  }
  console.info({isDisplayLabelValid});
  var renderedLabelItems = [];
  for (var j = 0; j < CHAR_COUNT; j++) {
    var i_color;
    var inner = [];
    for (var i = 0; i < CHARS_PER_WORD; i++) {
      const charLoc = CHARS_PER_WORD * j + i;
      const c = displayLabel.charAt(charLoc);
      if (isDisplayLabelValid) {
        if (c === displayLabel.charAt(CHARS_PER_WORD * (CHAR_COUNT - 1) + i)) {
          i_color = 3;
        } else if (
          displayLabel.substring(CHARS_PER_WORD * (CHAR_COUNT - 1)).includes(c)
        ) {
          i_color = 2;
        } else {
          i_color = 1;
        }
      } else {
        i_color = 0;
      }

      const onChangeChar = function (chars) {
        if (chars === "BACKSPACE") {
          onChangeLabel(
            displayLabel,
            (charLoc - 2 + CHAR_COUNT * CHARS_PER_WORD) %
              (CHAR_COUNT * CHARS_PER_WORD)
          );
          return;
        }

        if (chars.length !== 1) {
          return;
        }

        let newLabel =
          displayLabel.substring(0, charLoc) +
          chars +
          displayLabel.substring(charLoc + 1);
        if (newLabel.length > CHAR_COUNT * CHARS_PER_WORD) {
          newLabel = newLabel.substring(0, CHAR_COUNT * CHARS_PER_WORD);
        }
        onChangeLabel(newLabel, charLoc);
      };

      const backgroundColor = BACKGROUND_COLORS[i_color];
      const color = COLORS[i_color];
      inner.push(
        <WordleSquare
          key={`input-${j}-${i}`}
          c={c}
          color={color}
          backgroundColor={backgroundColor}
          onChangeChar={onChangeChar}
        />
      );
    }
    renderedLabelItems.push(<div key={`span-${j}`}>{inner}</div>);
  }
  return renderedLabelItems;
}
