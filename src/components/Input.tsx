import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { twMerge } from 'tailwind-merge';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label: string;
  error?: string;
  hint?: string;
  suffix?: ReactNode;
  /** Raw value without separators; Persian/Arabic digits are normalized. */
  onValueChange?: (rawValue: string) => void;
};

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

function normalizeDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (char) => {
    const persianIndex = PERSIAN_DIGITS.indexOf(char);
    if (persianIndex > -1) return String(persianIndex);
    return String(ARABIC_DIGITS.indexOf(char));
  });
}

function addSeparators(rawValue: string): string {
  if (rawValue === '') return '';
  return Number(rawValue).toLocaleString('en-US');
}

const Input = forwardRef(
  (
    {
      error,
      label,
      hint,
      suffix,
      className,
      onValueChange,
      value,
      ...rest
    }: Props,
    ref: Ref<HTMLInputElement>
  ) => {
    const id = useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = normalizeDigits(e.target.value).replace(/,/g, '');
      if (rawValue === '' || /^\d+$/.test(rawValue)) {
        onValueChange?.(rawValue);
      }
    };

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-ink/80">
          {label}
        </label>
        <div className="relative">
          <input
            {...rest}
            ref={ref}
            id={id}
            type="text"
            inputMode="numeric"
            value={addSeparators(String(value ?? ''))}
            onChange={handleChange}
            aria-invalid={!!error}
            className={twMerge(
              'w-full rounded-xl border border-ink/15 bg-white p-3 text-left text-xl font-bold tracking-wide text-ink shadow-sm transition-colors placeholder:text-base placeholder:font-normal placeholder:text-ink/30 hover:border-ink/30 focus:border-kashi-500',
              suffix ? 'pr-16' : '',
              className
            )}
            dir="ltr"
          />
          {suffix && (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-medium text-ink/40">
              {suffix}
            </span>
          )}
        </div>
        {error ? (
          <small className="text-xs font-medium text-red-600">{error}</small>
        ) : (
          <small
            className="min-h-[1rem] text-xs font-medium text-kashi-600"
            aria-live="polite"
          >
            {hint}
          </small>
        )}
      </div>
    );
  }
);

export default Input;
