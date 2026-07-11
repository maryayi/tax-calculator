import { useTaxContext } from '../contexts/use-tax-context';
import rules from '../core/rules';
import {
  convertToPersianNumbers,
  normalizeAnnualIRR,
  normalizeSalary,
} from '../utils';
import BracketSteps from './BracketSteps';
import Link from './Link';
import { currencyLabel, periodLabel } from '../constants';

/** Ghost staircase shown before the user has entered a salary. */
function EmptyState() {
  return (
    <div className="flex h-full min-h-[20rem] flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-ink/15 p-8 text-center">
      <div
        className="flex w-full max-w-[10rem] flex-col items-start gap-1.5"
        aria-hidden
      >
        {[35, 50, 65, 80, 100].map((width) => (
          <div
            key={width}
            className="h-2.5 rounded-full bg-ink/10"
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
      <p className="max-w-xs text-sm leading-6 text-ink/50">
        حقوق‌تان را وارد کنید تا خالص دریافتی، مالیات و پله‌های مالیاتی را
        همین‌جا ببینید
      </p>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-ink/10 bg-white p-4 shadow-card">
      <span className="text-xs font-medium text-ink/50">{label}</span>
      <span className="text-lg font-bold text-ink">{value}</span>
    </div>
  );
}

function ResultSection() {
  const { result } = useTaxContext();

  if (!result) {
    return <EmptyState />;
  }

  const { input, output } = result;
  const { currency, period, year } = input;

  const annualSalary = normalizeSalary(input);

  const format = (annualIRR: number, targetPeriod = period) =>
    convertToPersianNumbers(
      normalizeAnnualIRR(annualIRR, { currency, period: targetPeriod }),
      { useGrouping: true, fractionDigits: 0 }
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-2xl bg-kashi-800 p-6 text-white shadow-card">
        <div
          className="absolute -left-6 -top-10 flex w-40 rotate-12 flex-col gap-2 opacity-10"
          aria-hidden
        >
          {[100, 80, 60, 40].map((width) => (
            <div
              key={width}
              className="h-4 rounded-full bg-white"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-kashi-200">
          خالص دریافتی {periodLabel[period]}
        </span>
        <p className="mt-1 text-4xl font-black leading-tight">
          {format(output.pureSalary)}
          <span className="mr-2 text-base font-medium text-kashi-200">
            {currencyLabel[currency]}
          </span>
        </p>
        <p className="mt-3 text-sm text-kashi-100">
          {convertToPersianNumbers(output.totalPercent, {
            fractionDigits: 2,
            currency: '٪',
          })}{' '}
          از حقوق شما مالیات است
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatTile
          label={`مالیات ماهانه (${currencyLabel[currency]})`}
          value={format(output.totalTax, 'monthly')}
        />
        <StatTile
          label={`مالیات سالانه (${currencyLabel[currency]})`}
          value={format(output.totalTax, 'annual')}
        />
      </div>

      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
        <div className="mb-5 flex items-baseline justify-between gap-2">
          <h2 className="font-bold text-ink">
            پله‌های مالیاتی {convertToPersianNumbers(year)}
          </h2>
          <Link
            href={rules[year].reference}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs"
          >
            مرجع محاسبه
          </Link>
        </div>
        <BracketSteps
          annualSalary={annualSalary}
          appliedSteps={output.steps}
          currency={currency}
          period={period}
          year={year}
        />
      </div>
    </div>
  );
}

export default ResultSection;
