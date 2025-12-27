import {
  BanknotesIcon,
  CalendarDaysIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { DEFAULT_JALALI_YEAR } from '../constants.ts';
import { useTaxContext } from '../contexts/tax-context.tsx';
import calculateTax from '../core/calculate-tax.ts';
import rules from '../core/rules.ts';
import { convertToPersianNumbers, normalizeSalary } from '../utils/index.ts';
import Button from './Button';
import Input from './Input';
import Radio from './Radio';
import Select from './Select.tsx';

const years = Object.keys(rules) as (keyof typeof rules)[];

export type TaxFormType = {
  salary: number;
  period: 'monthly' | 'annual';
  currency: 'IRR' | 'IRT';
  year: keyof typeof rules;
};

export const periodLabel: Record<TaxFormType['period'], string> = {
  monthly: 'ماهانه',
  annual: 'سالانه',
};

export const currencyLabel: Record<TaxFormType['currency'], string> = {
  IRT: 'تومان',
  IRR: 'ریال',
};

const schema = yup.object().shape({
  salary: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        const cleaned = originalValue.replace(/,/g, '');
        return cleaned === '' ? undefined : Number(cleaned);
      }
      return value;
    })
    .min(0, 'عدد مثبت وارد کنید')
    .required('حقوق‌تان را وارد کنید. زبان کیبرد انگلیسی باشد')
    .typeError('حقوق‌تان را به عدد وارد کنید. زبان کیبرد انگلیسی باشد'),
  period: yup
    .mixed<TaxFormType['period']>()
    .oneOf(['monthly', 'annual'])
    .required('بازه زمانی را وارد کنید'),
  currency: yup
    .mixed<TaxFormType['currency']>()
    .oneOf(['IRR', 'IRT'])
    .required('واحد را وارد کنید'),
  year: yup
    .mixed<TaxFormType['year']>()
    .oneOf(years)
    .required('سال مالی را وارد کنید'),
});

function TaxForm() {
  const { setOutput, setInput, setIsModalOpen } = useTaxContext();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<TaxFormType>({
    mode: 'all',
    defaultValues: {
      period: 'monthly',
      currency: 'IRT',
      year: DEFAULT_JALALI_YEAR,
    },
    resolver: yupResolver(schema),
  });

  const period = watch('period');

  const currency = watch('currency');

  const inputLabel = `حقوق ${periodLabel[period]} (${currencyLabel[currency]})`;

  const onSubmit = ({ salary, period, currency, year }: TaxFormType) => {
    setInput({ salary, period, currency, year });
    const result = calculateTax({
      salary: normalizeSalary({ salary, currency, period }),
      year,
    });
    setOutput(result);
    setIsModalOpen(true);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="year"
        control={control}
        render={({ field }) => {
          return (
            <Select
              icon={<CalendarDaysIcon className="w-6 h-6" />}
              label="سال مالی"
              options={years.map((year) => ({
                value: year,
                label: (
                  <p>
                    {convertToPersianNumbers(+year)}{' '}
                    {!rules[year].isApproved && (
                      <span className="text-red-500 text-xs">
                        (لایحه تصویب نشده)
                      </span>
                    )}
                  </p>
                ),
              }))}
              onChange={field.onChange}
              name={field.name}
              value={field.value}
              error={errors?.year?.message}
            />
          );
        }}
      />
      <Controller
        name="currency"
        control={control}
        render={({ field }) => {
          return (
            <Radio
              icon={<BanknotesIcon className="w-6 h-6" />}
              label="واحد پول"
              options={[
                { label: currencyLabel['IRT'], value: 'IRT' },
                { label: currencyLabel['IRR'], value: 'IRR' },
              ]}
              onChange={field.onChange}
              name={field.name}
              value={field.value}
              error={errors?.currency?.message}
            />
          );
        }}
      />
      <Controller
        name="period"
        control={control}
        render={({ field }) => {
          return (
            <Radio
              icon={<ClockIcon className="w-6 h-6" />}
              label="واحد زمانی"
              options={[
                { label: periodLabel['monthly'], value: 'monthly' },
                { label: periodLabel['annual'], value: 'annual' },
              ]}
              onChange={field.onChange}
              name={field.name}
              value={field.value}
              error={errors?.currency?.message}
            />
          );
        }}
      />
      <Input
        {...register('salary')}
        dir="ltr"
        className="font-num remove-arrow"
        type="number"
        error={errors?.salary?.message}
        label={inputLabel}
        thousandsSeparator
      />

      <Button type="submit">حساب کن</Button>
    </form>
  );
}

export default TaxForm;
