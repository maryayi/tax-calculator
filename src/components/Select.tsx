import { useId, type InputHTMLAttributes, type ReactNode } from 'react';

type Props = InputHTMLAttributes<HTMLSelectElement> & {
  label: string | ReactNode;
  options: Option[];
  error?: string;
  icon?: ReactNode;
};

type Option = {
  label: string | ReactNode;
  value: string;
};

function Select({ label, options, error, icon, ...rest }: Props) {
  const id = useId();

  return (
    <div className="flex gap-1 items-center">
      {!!icon && icon}
      <legend className="text-lg font-bold pl-4">{label}</legend>

      <select {...rest} className="bg-white border border-black p-1 rounded-md">
        {options.map(({ value, label: itemLabel }: Option) => (
          <option
            className="flex gap-1"
            key={value}
            value={value}
            id={`${id}-${value}`}
          >
            <label htmlFor={`${id}-${value}`}>{itemLabel}</label>
          </option>
        ))}
      </select>
      {error && <small className="text-red-500 text-xs">{error}</small>}
    </div>
  );
}

export default Select;
