import type { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, ...rest }: ButtonType) {
  return (
    <button
      {...rest}
      className={twMerge(
        'bg-blue-600 text-white p-2 w-fit rounded-sm',
        rest.className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
