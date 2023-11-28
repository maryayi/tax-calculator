import { useTaxContext } from '../contexts/tax-context';
import ResultTable from './ResultTable';

function ResultSection() {
  const { output } = useTaxContext();

  const tableData = [
    { header: 'مالیات', value: output.totalTax },
    { header: 'درصد مالیات از کل درآمد', value: output.totalPercent },
  ];
  return (
    <div>
      <ResultTable data={tableData} />
    </div>
  );
}

export default ResultSection;
