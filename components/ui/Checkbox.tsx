type Props = {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
};

export default function Checkbox({ label, checked = false, disabled = false, onChange }: Props) {
  return (
    <div className="inline-flex">
      <label className="label cursor-pointer gap-2 px-0">
        <input
          id={label}
          className="checkbox"
          type="checkbox"
          onChange={(e) => onChange(e.currentTarget.checked)}
          disabled={disabled}
          checked={checked}
        />
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
}
