import { InputProps } from './Input.type.ts';

// My custom input component to reduce boilerplate code
const Input = ({ label, value, setValue, type }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        className="form-control"
        placeholder={label}
      />
    </>
  );
};

export default Input;
