export default function Button({
  loading = false,
  warning = false,
  small = false,
  circle = false,
  error = false,
  disabled = false,
  onClick = () => {},
  children = ""
}) {
  return (
    <button
      disabled={disabled}
      className={`btn ${loading && "loading"} ${warning ? "btn-warning text-gray-200" : "btn-primary"} ${small && "btn-sm"} ${
        circle && "btn-circle"
      } ${error && "btn-error"}`}
      onClick={onClick}
    >
      {!loading && children}
    </button>
  );
}
