import rules from '../core/rules';
import { convertToPersianNumbers, normalizeAnnualIRR } from '../utils';
import { type TaxFormType } from '../constants';

type Props = {
  /** Annual salary in IRR */
  annualSalary: number;
  appliedSteps: {
    annualMin: number;
    taxPercent: number;
    appliedTax: number;
  }[];
  currency: TaxFormType['currency'];
  period: TaxFormType['period'];
  year: TaxFormType['year'];
};

/** Fill color per tax rate: deeper means a higher rate. */
const RATE_COLORS: Record<number, string> = {
  0: '#94A3B8',
  10: '#83C7BE',
  15: '#4EA89D',
  20: '#2B8B80',
  25: '#157A6F',
  30: '#0D4F49',
};

function formatAmount(
  annualIRR: number,
  currency: TaxFormType['currency'],
  period: TaxFormType['period']
) {
  return convertToPersianNumbers(
    normalizeAnnualIRR(annualIRR, { currency, period }),
    { useGrouping: true, fractionDigits: 0 }
  );
}

function BracketSteps({
  annualSalary,
  appliedSteps,
  currency,
  period,
  year,
}: Props) {
  const brackets = rules[year].steps;

  return (
    <ol className="flex flex-col gap-4">
      {brackets.map(({ annualMin, taxPercent }, index) => {
        const upper = brackets[index + 1]?.annualMin;
        // The last bracket is open-ended; draw its fill against an
        // arbitrary span so it never looks complete.
        const upperForFill = upper ?? Math.max(annualSalary, annualMin) * 1.5;
        const fillPercent = Math.min(
          Math.max(
            ((annualSalary - annualMin) / (upperForFill - annualMin)) * 100,
            0
          ),
          100
        );
        const isReached = annualSalary > annualMin;
        const appliedTax =
          appliedSteps.find((step) => step.annualMin === annualMin)
            ?.appliedTax ?? 0;

        const rangeText = upper
          ? `از ${formatAmount(annualMin, currency, period)} تا ${formatAmount(
              upper,
              currency,
              period
            )}`
          : `از ${formatAmount(annualMin, currency, period)} به بالا`;

        return (
          <li
            key={annualMin}
            className={`flex flex-col gap-1.5 transition-opacity ${
              isReached ? '' : 'opacity-40'
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-sm">
              <span
                className="w-10 shrink-0 rounded-md px-1.5 py-0.5 text-center text-xs font-bold text-white"
                style={{
                  backgroundColor: RATE_COLORS[taxPercent] ?? '#0A3D39',
                }}
              >
                {convertToPersianNumbers(taxPercent, { currency: '٪' })}
              </span>
              <span className="text-ink/60">{rangeText}</span>
              {appliedTax > 0 && (
                <span className="mr-auto font-bold text-saffron-600">
                  {formatAmount(appliedTax, currency, period)}−
                </span>
              )}
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink/5">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${fillPercent}%`,
                  backgroundColor: RATE_COLORS[taxPercent] ?? '#0A3D39',
                }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default BracketSteps;
