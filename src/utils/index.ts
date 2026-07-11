import { type TaxFormType } from '../constants';

export function convertToPersianNumbers(
  number: number | string,
  {
    useGrouping = false,
    fractionDigits = 0,
    currency,
  }: {
    useGrouping?: boolean;
    currency?: string;
    fractionDigits?: number;
  } = {
    useGrouping: false,
    currency: undefined,
    fractionDigits: 0,
  }
): string {
  const numeralNum = typeof number === 'string' ? +number : number;

  let result = Intl.NumberFormat('fa-IR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
    useGrouping,
  }).format(numeralNum);

  if (currency) {
    result = `${result} ${currency}`;
  }

  return result;
}

export function convertToEnglishNumbers(persianStringNumber: string): number {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  let stringResult = persianStringNumber;

  for (const [index, item] of Object.entries(persianDigits)) {
    stringResult = stringResult.replace(new RegExp(item, 'g'), index);
  }

  // Replacing decimal point
  stringResult.replace(/٫/g, '.');

  return +stringResult;
}

export function IRR2IRT(IRR: number) {
  return IRR / 10;
}

export function IRT2IRR(IRT: number) {
  return IRT * 10;
}

export function monthly2Annual(monthlyValue: number) {
  return monthlyValue * 12;
}

export function annual2Monthly(annualValue: number) {
  return annualValue / 12;
}

/**
 * Normalize Salary
 *
 * This function takes salary-related information and converts it to an annual salary in IRR currency.
 *
 * @param {object} params - The salary-related parameters.
 * @param {number} params.salary - The salary amount.
 * @param {'monthly' | 'annual'} params.period - The salary period, either 'monthly' or 'annual'.
 * @param {'IRR' | 'IRT'} params.currency - The currency of the salary, either 'IRR' or 'IRT'.
 *
 * @returns {number} - The normalized annual salary in IRR currency.
 *
 * @remarks
 * This function performs the following conversions:
 * - If the salary is provided in monthly periods, it is converted to an annual salary.
 * - If the currency is 'IRT', it is converted to 'IRR'.
 *
 * @example
 * Convert monthly salary in IRT to annual salary in IRR
 * const normalizedSalary = normalizeSalary({
 *   salary: 50000000, // 50,000,000 IRT
 *   period: 'monthly',
 *   currency: 'IRT',
 * });
 *  Result: normalizedSalary is the equivalent annual salary in IRR.
 */
export function normalizeSalary({
  salary,
  period,
  currency,
}: Omit<TaxFormType, 'year'>) {
  let modifiedSalary = salary;
  if (period === 'monthly') {
    modifiedSalary = monthly2Annual(modifiedSalary);
  }
  if (currency === 'IRT') {
    modifiedSalary = IRT2IRR(modifiedSalary);
  }

  return modifiedSalary;
}

/**
 * Convert an annual IRR value to the user's selected currency and period.
 */
export function normalizeAnnualIRR(
  value: number,
  {
    currency,
    period,
  }: { currency: TaxFormType['currency']; period: TaxFormType['period'] }
) {
  let result = value;

  if (currency === 'IRT') {
    result = IRR2IRT(result);
  }

  if (period === 'monthly') {
    result = annual2Monthly(result);
  }

  return result;
}

/**
 * Format a number as compact Persian words, e.g.
 * 45_200_000 -> "۴۵ میلیون و ۲۰۰ هزار"
 */
export function formatCompactPersian(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return '';

  const units: { threshold: number; label: string }[] = [
    { threshold: 1_000_000_000_000, label: 'هزار میلیارد' },
    { threshold: 1_000_000_000, label: 'میلیارد' },
    { threshold: 1_000_000, label: 'میلیون' },
    { threshold: 1_000, label: 'هزار' },
  ];

  const parts: string[] = [];
  let remainder = Math.floor(value);

  for (const { threshold, label } of units) {
    const count = Math.floor(remainder / threshold);
    if (count > 0) {
      parts.push(`${convertToPersianNumbers(count)} ${label}`);
      remainder %= threshold;
    }
  }

  if (remainder > 0) {
    parts.push(convertToPersianNumbers(remainder));
  }

  return parts.join(' و ');
}

export function getCurrentJalaliYear(): string {
  const persianJalaliYear = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
  }).format(new Date());

  return convertToEnglishNumbers(persianJalaliYear).toString();
}
