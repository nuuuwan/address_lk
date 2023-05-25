export default function WordleSquare({ c, color, backgroundColor, onChange }) {
  return (
    <input
      type="text"
      className="input-char"
      style={{ color, backgroundColor, borderColor: color }}
      value={c}
      onChange={onChange}
    />
  );
}
