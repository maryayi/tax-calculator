import { useTaxContext } from '../contexts/tax-context';
import Modal from './Modal';
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
