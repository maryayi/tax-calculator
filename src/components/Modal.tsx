import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Fragment, PropsWithChildren, ReactElement } from 'react';

type Props = PropsWithChildren<{
  title?: string | ReactElement;
  isOpen: boolean;
  onClose: () => void;
}>;

function Modal({ children, isOpen, onClose, title }: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" static className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-ink/40 backdrop-blur-xs" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden overflow-x-auto rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                <DialogTitle
                  as="div"
                  className="flex items-center justify-between border-b border-ink/10 pb-4"
                >
                  <h3 className="text-lg font-bold text-ink">{title}</h3>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="بستن"
                    className="rounded-lg p-1 text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </DialogTitle>
                <div className="pt-5">{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
