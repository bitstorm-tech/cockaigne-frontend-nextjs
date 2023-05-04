import { uniqueId } from "lodash";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;

export default function Input({
  label = "",
  centerText = false,
  letterSpacing = false,
  type = "text",
  placeholder = "",
  value = "",
  min = "",
  disabled = false,
  maxlength = -1,
  onEnter = () => {},
  onChange = (_: string) => {},
  id = uniqueId("input-")
}) {
  function onKeyPress(event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    if (event.key === "Enter") {
      onEnter!();
    }
  }

  return (
    <div className="form-control">
      <label className="label" htmlFor={id}>
        <span className="label-text text-xs">{label}</span>
      </label>
      <input
        className={`input-bordered input focus:border-primary focus:outline-none ${centerText && "text-center"} ${
          letterSpacing && "tracking-[0.5rem]"
        }`}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        min={min}
        disabled={disabled}
        maxLength={maxlength}
        onInput={(event) => onChange!(event.currentTarget.value)}
        onKeyDown={onKeyPress}
      />
    </div>
  );
}
