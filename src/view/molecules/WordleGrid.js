import {
  CHAR_COUNT,
  BACKGROUND_COLORS,
  COLORS,
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
  var renderedLabelItems = [];
  for (var j = 0; j < CHAR_COUNT; j++) {
    var i_color;
    var inner = [];
    for (var i = 0; i < 5; i++) {
      const charLoc = 5 * j + i;
      const c = displayLabel.charAt(charLoc);
      if (isDisplayLabelValid) {
        if (c === displayLabel.charAt(5 * (CHAR_COUNT - 1) + i)) {
          i_color = 3;
        } else if (displayLabel.substring(5 * (CHAR_COUNT - 1)).includes(c)) {
          i_color = 2;
        } else {
          i_color = 1;
        }
      } else {
        i_color = 0;
      }

      const onChangeChar = function (char) {
        const newLabel =
          displayLabel.substring(0, charLoc) +
          char +
          displayLabel.substring(charLoc + 1);
        onChangeLabel(newLabel);
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
