type Props = {
  loading?: boolean;
  warning?: boolean;
  small?: boolean;
  circle?: boolean;
  error?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function Button({
  loading = false,
  warning = false,
  small = false,
  circle = false,
  error = false,
  disabled = false,
  onClick = () => {},
  children
}: Props) {
  return (
    <button
      disabled={disabled}
      className={`btn w-full ${loading && "loading"} ${warning ? "btn-warning text-gray-200" : "btn-primary"} ${
        small && "btn-sm"
      } ${circle && "btn-circle"} ${error && "btn-error"}`}
      onClick={onClick}
    >
      {!loading && children}
    </button>
  );
}
