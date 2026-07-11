import { DISCLAIMER_MESSAGE } from '../constants';
import Link from './Link';

function Footer() {
  return (
    <div className="w-full border-t border-ink/10 bg-white">
      <footer className="mx-auto flex w-full max-w-5xl flex-col items-center gap-1.5 px-4 py-5">
        <p className="text-center text-sm text-ink/70">
          ساخته شده توسط{' '}
          <Link
            href="https://twitter.com/maryayi"
            target="_blank"
            rel="noopener noreferrer"
          >
            مهدی آریایی
          </Link>{' '}
          ·{' '}
          <Link
            href="https://github.com/maryayi/tax-calculator"
            target="_blank"
            rel="noopener noreferrer"
          >
            کد منبع
          </Link>
        </p>
        <p className="text-center text-xs text-ink/40">{DISCLAIMER_MESSAGE}</p>
      </footer>
    </div>
  );
}

export default Footer;
