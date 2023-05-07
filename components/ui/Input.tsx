import { uniqueId } from "lodash";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;

type InputProps = {
  label?: string;
  centerText?: boolean;
  letterSpacing?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  min?: string;
  disabled?: boolean;
  maxlength?: number;
  onEnter?: () => void;
  onChange?: (_: string) => void;
};

export default function Input({
  label = "",
  centerText,
  letterSpacing,
  type = "text",
  placeholder = "",
  value = "",
  min = "",
  disabled,
  maxlength = -1,
  onEnter = () => {},
  onChange = (_: string) => {}
}: InputProps) {
  const id = uniqueId("input-");

  function handleKeyPress(event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
    if (event.key === "Enter") {
      onEnter!();
    }
  }

  // @ts-ignore
  function handleInput(event) {
    value = event.currentTarget.value;
    onChange(event.currentTarget.value);
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
        onInput={handleInput}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
