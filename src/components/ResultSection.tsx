import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useTaxContext } from '../contexts/tax-context';
import ResultTable from './ResultTable';

function ResultSection() {
  const { input, output, isModalOpen, setIsModalOpen } = useTaxContext();

  const tableData = [
    { header: 'درآمد', value: input.salary },
    { header: 'سال مالی', value: input.year },
    { header: 'مالیات', value: output.totalTax },
    { header: 'درصد مالیات از کل درآمد', value: output.totalPercent },
  ];
  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        open={isModalOpen}
        className="relative z-50"
        onClose={() => setIsModalOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title>
                <div className="mt-2">
                  <ResultTable data={tableData} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ResultSection;
