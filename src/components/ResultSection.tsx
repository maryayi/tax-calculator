import { useTaxContext } from '../contexts/tax-context';
import { convertToPersianNumbers } from '../utils';
import Modal from './Modal';
import ResultTable from './ResultTable';
import { currencyLabel } from './TaxForm';

function ResultSection() {
  const { input, output, isModalOpen, setIsModalOpen } = useTaxContext();

  const tableData = [
    {
      header: 'درآمد',
      value: convertToPersianNumbers(input.salary, {
        useGrouping: true,
        currency: currencyLabel[input.currency],
      }),
    },
    { header: 'سال مالی', value: convertToPersianNumbers(input.year) },
    {
      header: 'مالیات',
      value: convertToPersianNumbers(output.totalTax, {
        useGrouping: true,
        fractionDigits: 0,
        currency: currencyLabel[input.currency],
      }),
    },
    {
      header: 'درصد مالیات از کل درآمد',
      value: convertToPersianNumbers(output.totalPercent, {
        useGrouping: false,
        fractionDigits: 2,
        currency: '%',
      }),
    },
  ];
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="مالیات شما"
    >
      <ResultTable data={tableData} />
    </Modal>
  );
}

export default ResultSection;
