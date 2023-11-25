import { forwardRef, useId, type InputHTMLAttributes, type Ref } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = forwardRef(
  ({ error, label, className, ...rest }: Props, ref: Ref<HTMLInputElement>) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-0 items-start">
        <label htmlFor={id} className="text-lg font-bold">
          {label}
        </label>
        <input
          {...rest}
          ref={ref}
          id={id}
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
