import { forwardRef, useId, useState, type InputHTMLAttributes, type Ref, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  thousandsSeparator?: boolean;
};

const Input = forwardRef(
  ({ error, label, className, thousandsSeparator = false, onChange, value, type, ...rest }: Props, ref: Ref<HTMLInputElement>) => {
    const id = useId();
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
      if (thousandsSeparator && value !== undefined) {
        const numValue = String(value).replace(/,/g, '');
        if (numValue && !isNaN(Number(numValue))) {
          setDisplayValue(Number(numValue).toLocaleString('en-US'));
        } else {
          setDisplayValue('');
        }
      }
    }, [value, thousandsSeparator]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (thousandsSeparator) {
        const rawValue = e.target.value.replace(/,/g, '');

        if (rawValue === '' || !isNaN(Number(rawValue))) {
          const formattedValue = rawValue ? Number(rawValue).toLocaleString('en-US') : '';
          setDisplayValue(formattedValue);

          const syntheticEvent = {
            ...e,
            target: {
              ...e.target,
              value: rawValue,
            },
          } as React.ChangeEvent<HTMLInputElement>;

          onChange?.(syntheticEvent);
        }
      } else {
        onChange?.(e);
      }
    };

    return (
      <div className="flex flex-col gap-0 items-start">
        <label htmlFor={id} className="text-lg font-bold">
          {label}
        </label>
        <input
          {...rest}
          ref={ref}
          id={id}
          type={thousandsSeparator ? 'text' : type}
          value={thousandsSeparator ? displayValue : value}
          onChange={handleChange}
          className={twMerge(
            'p-2 border border-slate-600 border-solid rounded-md',
            className
          )}
        />
        {error && <small className="text-red-500 text-xs">{error}</small>}
      </div>
    );
  }
);

export default Input;
