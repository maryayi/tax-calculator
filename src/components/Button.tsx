import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, ...rest }: ButtonType) {
  return (
    <button
      {...rest}
      className={twMerge(
        'rounded-xl bg-kashi-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-kashi-700 active:bg-kashi-800',
        rest.className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
