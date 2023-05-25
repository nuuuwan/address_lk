export default function WordleSquare({
  c,
  color,
  backgroundColor,
  onChangeChar,
}) {
  const onChangeInner = function (event) {
    onChangeChar(event.target.value.charAt(0).toUpperCase());
  };
  return (
    <input
      type="text"
      className="input-char"
      style={{ color, backgroundColor, borderColor: color }}
      value={c}
      onChange={onChangeInner}
    />
  );
}
