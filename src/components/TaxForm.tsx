import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from './Button';
import Input from './Input';
import Radio from './Radio';

type TaxFormType = {
  salary: number;
  period: 'monthly' | 'annual';
  currency: 'IRR' | 'IRT';
  year: '1402' | '1403';
};

const periodLabel: Record<TaxFormType['period'], string> = {
  monthly: 'ماهانه',
  annual: 'سالانه',
};

const currencyLabel: Record<TaxFormType['currency'], string> = {
  IRT: 'تومان',
  IRR: 'ریال',
};

const schema = yup.object().shape({
  salary: yup
    .number()
    .min(0, 'عدد مثبت وارد کنید')
    .required('درآمدتان را وارد کنید')
    .typeError('درآمدتان را به عدد وارد کنید. زبان کیبرد انگلیسی باشد'),
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
    .oneOf(['1402', '1403'])
    .required('سال مالی را وارد کنید'),
});

function TaxForm() {
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
      year: '1402',
    },
    resolver: yupResolver(schema),
  });

  const period = watch('period');

  const currency = watch('currency');

  const inputLabel = `درآمد ${periodLabel[period]} (${currencyLabel[currency]})`;

  const onSubmit = (data: TaxFormType) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-3 p-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="year"
        control={control}
        render={({ field }) => {
          return (
            <Radio
              label="سال مالی"
              options={[
                { label: '۱۴۰۲', value: '1402' },
                {
                  label: (
                    <p>
                      ۱۴۰۳{' '}
                      <span className="text-red-500 text-xs">
                        (لایحه تصویب نشده)
                      </span>
                    </p>
                  ),
                  value: '1403',
                },
              ]}
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
        error={errors?.salary?.message}
        label={inputLabel}
      />

      <Button type="submit">حساب کن</Button>
    </form>
  );
}

export default TaxForm;
