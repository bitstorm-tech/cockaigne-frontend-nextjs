type SelectProps = {
  label: string;
  options: Map<string, string>;
  selected?: string;
  disabled?: boolean;
  onSelect: (value: string) => void;
};

export default function Select({ label, options, selected = "", disabled = false, onSelect }: SelectProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xs">{label}</span>
      </label>
      <select
        className="text-md select-bordered select focus:border-primary focus:outline-none"
        value={selected}
        onChange={(e) => onSelect(e.currentTarget.value)}
        disabled={disabled}
      >
        {Array.from(options).map(([key, value]) => {
          return (
            <option key={key} value={key} selected={key === selected}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
