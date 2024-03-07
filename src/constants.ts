import rules from './core/rules';
import { getCurrentJalaliYear } from './utils';

export const DISCLAIMER_MESSAGE =
  'سلب مسئولیت: مسئولیت استفاده از محاسبات این برنامه به هر منظور بر عهده کاربر است';

export const DEFAULT_JALALI_YEAR = (
  Object.keys(rules).includes(getCurrentJalaliYear())
    ? getCurrentJalaliYear()
    : Object.keys(rules).at(-1)
) as keyof typeof rules;
