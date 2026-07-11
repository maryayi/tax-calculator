import { useId } from 'react';

type Option<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  const id = useId();

  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="mb-1.5 text-sm font-semibold text-ink/80">
        {label}
      </legend>
      <div className="grid auto-cols-fr grid-flow-col gap-1 rounded-xl bg-ink/5 p-1">
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <label
            key={optionValue}
            htmlFor={`${id}-${optionValue}`}
            className="cursor-pointer rounded-lg px-4 py-2 text-center text-sm font-semibold text-ink/50 transition-colors hover:text-ink/80 has-[:checked]:bg-white has-[:checked]:text-kashi-700 has-[:checked]:shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-kashi-500"
          >
            <input
              type="radio"
              id={`${id}-${optionValue}`}
              name={id}
              value={optionValue}
              checked={optionValue === value}
              onChange={() => onChange(optionValue)}
              className="sr-only"
            />
            {optionLabel}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default SegmentedControl;
