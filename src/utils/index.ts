import { TaxFormType } from '../components/TaxForm';

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
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
    useGrouping,
  }).format(numeralNum);

  if (currency) {
    result = `${result} ${currency}`;
  }

  return result;
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
