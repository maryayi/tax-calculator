import { useState } from 'react';
import { DISCLAIMER_MESSAGE } from '../constants';
import Link from './Link';
import Modal from './Modal';
import ReferencesTable from './ReferencesTable';

function HeaderLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ul className="flex gap-4 list-none items-center">
        <li className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          چگونه کار می‌کند؟
        </li>
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="چگونه کار می‌کند؟"
      >
        <div className="flex flex-col items-start gap-4">
          <p className="text-right text-base text-gray-800">
            این برنامه تلاشی است برای آسان‌تر کردن محاسبه مالیات بر حقوق بر اساس
            جداول تعیین شده در قانون بودجه سالانه کشور. مرجع محاسبات مالیات هر
            سال در جدول زیر آمده است.
          </p>
          <ReferencesTable />
          <p className="text-right text-base text-gray-800">
            تمام محاسبات این برنامه در مرورگر شما انجام می‌شود و اطلاعات مالی
            شما به هیچ سروری ارسال نمی‌گردد.
          </p>
          <p className="text-right text-base text-gray-800">
            لطفا در صورت مشاهده هر گونه اشکال یا برای ارائه هر گونه پیشنهاد از
            طریق صفحه ارسال مشکل (
            <Link
              target="_blank"
              href="https://github.com/maryayi/tax-calculator/issues"
            >
              issues
            </Link>
            ) در گیتهاب پروژه یا آدرس ایمیل{' '}
            <pre className="inline">mahdiaryayi [at] gmail</pre> به من اطلاع
            دهید.
          </p>
          <p className="text-center font-bold text-base text-gray-800">
            {DISCLAIMER_MESSAGE}
          </p>
        </div>
      </Modal>
    </>
  );
}

export default HeaderLinks;
