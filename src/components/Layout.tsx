import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 lg:py-12">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-ink lg:text-3xl">
              مالیات حقوق‌تان را همین حالا حساب کنید
            </h1>
            <p className="mt-2 text-sm text-ink/60">
              بر اساس جدول‌های قانون بودجه — همه محاسبات در مرورگر شما انجام
              می‌شود و هیچ داده‌ای ارسال نمی‌گردد
            </p>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
