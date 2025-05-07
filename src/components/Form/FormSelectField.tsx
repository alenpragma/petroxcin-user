// import { Controller, useFormContext } from "react-hook-form";
// import Select from "react-select";
// import { useState } from "react";

// type TOption = {
//   label: string;
//   value: string;
// };

// type TSelectProps = {
//   name: string;
//   options: TOption[];
//   placeholder?: string;
//   required?: boolean;
//   onChange?: (value: string) => void;
//   defaultValue?: number | null;
//   readonly?: boolean;
// };

// const FormSelectField = ({
//   name,
//   options,
//   placeholder,
//   required,
//   onChange,
//   defaultValue = null,
//   readonly = false,
// }: TSelectProps) => {
//   const { control } = useFormContext();
//   const [selectedOption, setSelectedOption] = useState<TOption | null>(
//     options && options.length > 0 && defaultValue !== null
//       ? options[defaultValue]
//       : null
//   );

//   return (
//     <Controller
//       name={name}
//       control={control}
//       defaultValue={selectedOption?.value || ""}
//       render={({ field }) => (
//         <Select
//           {...field}
//           options={options}
//           placeholder={placeholder}
//           value={selectedOption}
//           onChange={(option) => {
//             const selectedOption = option as TOption;
//             setSelectedOption(selectedOption);
//             field.onChange(selectedOption?.value);
//             onChange?.(selectedOption.value);
//           }}
//           isClearable={!required}
//           isDisabled={readonly}
//         />
//       )}
//     />
//   );
// };

// export default FormSelectField;


import { useFormContext } from "react-hook-form";

type TOption = {
  label: string;
  value: string;
};

type TSelectProps = {
  name: string;
  options: TOption[];
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  defaultValue?: string | null;
  readonly?: boolean;
};

const FormSelectField = ({
  name,
  options,
  placeholder,
  required = false,
  onChange,
  defaultValue = "",
  readonly = false,
}: TSelectProps) => {
  const { register, setValue } = useFormContext();

  return (
    <select
      {...register(name, { required })}
      defaultValue={defaultValue || ""}
      disabled={readonly}
      onChange={(e) => {
        const value = e.target.value;
        setValue(name, value);
        onChange?.(value);
      }}
      className="border px-3 py-[6px] rounded w-full"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelectField;
