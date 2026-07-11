import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useId, type ReactNode, type SelectHTMLAttributes } from 'react';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  hint?: ReactNode;
};

type Option = {
  label: string;
  value: string;
};

function Select({ label, options, hint, ...rest }: Props) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink/80">
        {label}
      </label>
      <div className="relative">
        <select
          {...rest}
          id={id}
          className="w-full cursor-pointer appearance-none rounded-xl border border-ink/15 bg-white p-3 pl-10 font-semibold text-ink shadow-xs transition-colors hover:border-ink/30 focus:border-kashi-500"
        >
          {options.map(({ value, label: itemLabel }) => (
            <option key={value} value={value}>
              {itemLabel}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
      </div>
      {hint}
    </div>
  );
}

export default Select;
