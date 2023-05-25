import "./WordleSquare.css";

export default function WordleSquare({
  c,
  color,
  backgroundColor,
  onChangeChar,
}) {
  const onChangeInner = function (event) {
    const char = event.key.toUpperCase();
    onChangeChar(char);
  };

  const onDummy = function (event) {
    console.debug(event)
  }
  return (
    <input
      type="text"
      className="wordle-square-input"
      style={{ color, backgroundColor, borderColor: color }}
      value={c}
      onKeyDown={onChangeInner}
      onChange={onDummy}
      onFocus={(e) => e.target.select()}
    />
  );
}
