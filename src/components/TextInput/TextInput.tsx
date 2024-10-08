import { forwardRef } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

interface TextInputProps {
  label: string;
  type: string;
  placeholder?: string;
  registerId: string;
  errors: FieldErrors<FieldValues>;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, type, placeholder, errors, registerId, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[5px]">
        <label className="text-slate-500">{label}</label>
        <input
          className="border border-black px-[10px] py-[5px] min-w-[300px] "
          type={type}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
        {errors[registerId] ? (
          <div className="text-[12px] text-red-600">
            {errors[registerId].message?.toString()}
          </div>
        ) : (
          <div className="h-[12px]"></div>
        )}
      </div>
    );
  }
);

export default TextInput;
