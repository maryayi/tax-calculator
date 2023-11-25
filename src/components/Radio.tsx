import { useId, type InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  options: Option[];
  error?: string;
};

type Option = {
  label: string;
  value: string;
};

function Radio({ label, options, error, ...rest }: Props) {
  const id = useId();

  return (
    <div>
      <legend className="text-lg font-bold">{label}</legend>

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
