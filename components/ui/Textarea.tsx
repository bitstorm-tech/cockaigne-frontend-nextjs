type Props = {
  label: string;
  lines?: number;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  resize?: boolean;
  onChange?: (value: string) => void;
  onEnter?: () => void;
};

export default function Textarea({
  label,
  lines = 3,
  placeholder = "",
  value = "",
  disabled = false,
  resize = true,
  onChange = (_) => {},
  onEnter = () => {}
}: Props) {
  function handleKeyPress(event: KeyboardEvent) {
    if (event.code === "Enter") {
      onEnter();
    }
  }

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xs">{label}</span>
      </label>
      <textarea
        className={`textarea-bordered textarea focus:border-primary focus:outline-none ${resize && "resize-none"}`}
        rows={lines}
        placeholder={placeholder}
        disabled={disabled}
        onInput={(e) => onChange(e.currentTarget.value)}
        // @ts-ignore
        onKeyDown={handleKeyPress}
        value={value}
      />
    </div>
  );
}
