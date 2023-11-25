import { PropsWithChildren } from 'react';
import Header from './Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
