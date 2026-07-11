import { useEffect, useState } from 'react';
import {
  currencyLabel,
  DEFAULT_JALALI_YEAR,
  periodLabel,
  type TaxFormType,
} from '../constants.ts';
import { useTaxContext } from '../contexts/use-tax-context.ts';
import calculateTax from '../core/calculate-tax.ts';
import rules from '../core/rules.ts';
import {
  convertToPersianNumbers,
  formatCompactPersian,
  normalizeSalary,
} from '../utils/index.ts';
import Input from './Input';
import SegmentedControl from './SegmentedControl';
import Select from './Select.tsx';

const years = Object.keys(rules) as (keyof typeof rules)[];

function TaxForm() {
  const { setResult } = useTaxContext();

  const [salary, setSalary] = useState('');
  const [period, setPeriod] = useState<TaxFormType['period']>('monthly');
  const [currency, setCurrency] = useState<TaxFormType['currency']>('IRT');
  const [year, setYear] = useState<TaxFormType['year']>(DEFAULT_JALALI_YEAR);

  useEffect(() => {
    const parsedSalary = Number(salary);

    if (salary === '' || !Number.isFinite(parsedSalary) || parsedSalary <= 0) {
      setResult(null);
      return;
    }

    const output = calculateTax({
      salary: normalizeSalary({ salary: parsedSalary, currency, period }),
      year,
    });

    setResult({
      input: { salary: parsedSalary, period, currency, year },
      output,
    });
  }, [salary, period, currency, year, setResult]);

  const salaryInWords = formatCompactPersian(Number(salary));

  return (
    <form
      className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6 shadow-card"
      onSubmit={(e) => e.preventDefault()}
    >
      <Select
        label="سال مالی"
        value={year}
        onChange={(e) => setYear(e.target.value as TaxFormType['year'])}
        options={years.map((yearOption) => ({
          value: yearOption,
          label: `${convertToPersianNumbers(+yearOption)}${
            rules[yearOption].isApproved ? '' : ' (لایحه تصویب نشده)'
          }`,
        }))}
        hint={
          !rules[year].isApproved && (
            <small className="flex w-fit items-center gap-1 rounded-md bg-saffron-50 px-2 py-1 text-xs font-medium text-saffron-700">
              لایحه بودجه این سال هنوز تصویب نشده و ارقام آن ممکن است تغییر کند
            </small>
          )
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <SegmentedControl
          label="واحد پول"
          options={[
            { label: currencyLabel['IRT'], value: 'IRT' },
            { label: currencyLabel['IRR'], value: 'IRR' },
          ]}
          value={currency}
          onChange={setCurrency}
        />
        <SegmentedControl
          label="واحد زمانی"
          options={[
            { label: periodLabel['monthly'], value: 'monthly' },
            { label: periodLabel['annual'], value: 'annual' },
          ]}
          value={period}
          onChange={setPeriod}
        />
      </div>

      <Input
        label={`حقوق ${periodLabel[period]} (${currencyLabel[currency]})`}
        placeholder="مثلا ۵۰٬۰۰۰٬۰۰۰"
        value={salary}
        onValueChange={setSalary}
        suffix={currencyLabel[currency]}
        autoFocus
        hint={
          salaryInWords
            ? `${salaryInWords} ${currencyLabel[currency]}`
            : 'نتیجه همزمان با تایپ شما محاسبه می‌شود'
        }
      />
    </form>
  );
}

export default TaxForm;
