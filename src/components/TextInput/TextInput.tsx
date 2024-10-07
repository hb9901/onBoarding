import { forwardRef } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

interface TextInputProps {
  label: string;
  type: string;
  errors: FieldErrors<FieldValues>;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, type, errors, ...props }, ref) => {
    return (
      <>
        <div className="flex flex-col">
          <label>{label}</label>
          <input type={type} ref={ref} {...props} />
        </div>
        {errors[label] && <div>{errors[label].message?.toString()}</div>}
      </>
    );
  }
);

export default TextInput;
