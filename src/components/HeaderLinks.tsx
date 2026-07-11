import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { DISCLAIMER_MESSAGE } from '../constants';
import Link from './Link';
import Modal from './Modal';
import ReferencesTable from './ReferencesTable';

function HeaderLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <QuestionMarkCircleIcon className="h-5 w-5" />
        چگونه کار می‌کند؟
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="چگونه کار می‌کند؟"
      >
        <div className="flex flex-col items-start gap-4">
          <p className="text-right text-sm leading-7 text-ink/80">
            این برنامه تلاشی است برای آسان‌تر کردن محاسبه مالیات بر حقوق بر اساس
            جداول تعیین شده در قانون بودجه سالانه کشور. مرجع محاسبات مالیات هر
            سال در جدول زیر آمده است.
          </p>
          <ReferencesTable />
          <p className="text-right text-sm leading-7 text-ink/80">
            تمام محاسبات این برنامه در مرورگر شما انجام می‌شود و اطلاعات مالی
            شما به هیچ سروری ارسال نمی‌گردد.
          </p>
          <p className="text-right text-sm leading-7 text-ink/80">
            لطفا در صورت مشاهده هر گونه اشکال یا برای ارائه هر گونه پیشنهاد از
            طریق صفحه ارسال مشکل (
            <Link
              target="_blank"
              href="https://github.com/maryayi/tax-calculator/issues"
            >
              issues
            </Link>
            ) در گیتهاب پروژه یا آدرس ایمیل{' '}
            <span className="font-mono text-xs" dir="ltr">
              mahdiaryayi [at] gmail
            </span>{' '}
            به من اطلاع دهید.
          </p>
          <p className="w-full rounded-xl bg-saffron-50 p-3 text-center text-xs font-medium text-saffron-700">
            {DISCLAIMER_MESSAGE}
          </p>
        </div>
      </Modal>
    </>
  );
}

export default HeaderLinks;
