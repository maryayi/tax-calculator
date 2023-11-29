import { Dialog, Transition } from '@headlessui/react';
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
      <Dialog
        as="div"
        static
        open={isOpen}
        className="relative z-50"
        onClose={onClose}
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
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="flex justify-between items-center"
                >
                  <h3 className="text-xl font-medium text-right leading-6 text-gray-900">
                    {title}
                  </h3>
                  <XMarkIcon
                    onClick={onClose}
                    className="h-7 w-7 text-gray-900 cursor-pointer"
                  />
                </Dialog.Title>
                <div className="mt-2 p-6">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
