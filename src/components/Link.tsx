import { AnchorHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

function Link({ children, className, ...rest }: Props) {
  return (
    <a className={twMerge('text-blue-600 cursor-pointer', className)} {...rest}>
      {children}
    </a>
  );
}

export default Link;
