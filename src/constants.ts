import rules from './core/rules';
import { getCurrentJalaliYear } from './utils';

export const DISCLAIMER_MESSAGE =
  'سلب مسئولیت: مسئولیت استفاده از محاسبات این برنامه به هر منظور بر عهده کاربر است';

export const DEFAULT_JALALI_YEAR = (
  Object.keys(rules).includes(getCurrentJalaliYear())
    ? getCurrentJalaliYear()
    : Object.keys(rules).at(-1)
) as keyof typeof rules;

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
