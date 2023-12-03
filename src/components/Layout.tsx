import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center w-full">
        <section className="max-w-5xl flex flex-col w-full p-4">
          {children}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
