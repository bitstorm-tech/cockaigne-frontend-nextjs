type Props = {
  label: string;
  min: number;
  max: number;
  step: number;
  value?: number;
  onChange: (value: number) => void;
};

export default function RangeSelect({ label, min, max, step, value = 500, onChange }: Props) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-xs">{label}</span>
      </label>
      <input
        className="range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(e) => onChange(+e.currentTarget.value)}
      />
    </div>
  );
}
