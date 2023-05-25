export default function CenterTargetView() {
  return (
    <svg className="svg-center" width="100%" height="100vh">
      <circle
        cx="50%"
        cy="50%"
        r="9%"
        fill="red"
        fillOpacity="0.5"
        stroke="none"
      />
      <circle
        cx="50%"
        cy="50%"
        r="5%"
        fill="red"
        fillOpacity="0.5"
        stroke="none"
      />
      <circle
        cx="50%"
        cy="50%"
        r="0.5%"
        fill="red"
        fillOpacity="1"
        stroke="none"
      />
    </svg>
  );
}
