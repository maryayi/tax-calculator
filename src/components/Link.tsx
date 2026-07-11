import { AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

function Link({ children, className, ...rest }: Props) {
  return (
    <a
      className={twMerge(
        'cursor-pointer rounded-xs text-lapis-600 underline decoration-lapis-600/30 underline-offset-4 transition-colors hover:text-lapis-700 hover:decoration-lapis-700/60',
        className
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

export default Link;
