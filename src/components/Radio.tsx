import { useId, type InputHTMLAttributes, type ReactNode } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string | ReactNode;
  options: Option[];
  error?: string;
  icon?: ReactNode;
};

type Option = {
  label: string | ReactNode;
  value: string;
};

function Radio({ label, options, error, icon, ...rest }: Props) {
  const id = useId();

  return (
    <div className="flex gap-1 items-center">
      {!!icon && icon}
      <legend className="text-lg font-bold pl-4">{label}</legend>

      {options.map(({ value, label: itemLabel }: Option) => (
        <div className="flex gap-1" key={value}>
          <input
            {...rest}
            type="radio"
            id={`${id}-${value}`}
            value={value}
            checked={value === rest.value}
          />
          <label htmlFor={`${id}-${value}`}>{itemLabel}</label>
        </div>
      ))}
      {error && <small className="text-red-500 text-xs">{error}</small>}
    </div>
  );
}

export default Radio;
