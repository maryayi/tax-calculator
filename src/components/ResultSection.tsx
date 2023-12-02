import { useTaxContext } from '../contexts/tax-context';
import { IRR2IRT, annual2Monthly, convertToPersianNumbers } from '../utils';
import Modal from './Modal';
import ResultDetailsTable from './ResultDetailsTable';
import ResultTable from './ResultTable';
import { TaxFormType, currencyLabel, periodLabel } from './TaxForm';

function normalizeOutputCurrency(
  value: number,
  currency: TaxFormType['currency']
) {
  let result = value;

  if (currency === 'IRT') {
    result = IRR2IRT(value);
  }

  return result;
}

function ResultSection() {
  const { input, output, isModalOpen, setIsModalOpen } = useTaxContext();

  const annualTaxValueInSelectedCurrency = normalizeOutputCurrency(
    output.totalTax,
    input.currency
  );

  const tableData = [
    {
      header: `درآمد ${periodLabel[input.period]}`,
      value: convertToPersianNumbers(input.salary, {
        useGrouping: true,
        currency: currencyLabel[input.currency],
      }),
    },
    { header: 'سال مالی', value: convertToPersianNumbers(input.year) },
    {
      header: `مالیات ${periodLabel['monthly']}`,
      value: convertToPersianNumbers(
        annual2Monthly(annualTaxValueInSelectedCurrency),
        {
          useGrouping: true,
          fractionDigits: 0,
          currency: currencyLabel[input.currency],
        }
      ),
    },
    {
      header: `مالیات ${periodLabel['annual']}`,
      value: convertToPersianNumbers(annualTaxValueInSelectedCurrency, {
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
        currency: '٪',
      }),
    },
  ];
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="مالیات شما"
    >
      <div className="flex gap-2">
        <ResultTable data={tableData} />
        <ResultDetailsTable
          steps={output.steps}
          currency={input.currency}
          totalTax={output.totalTax}
          period={input.period}
        />
      </div>
    </Modal>
  );
}

export default ResultSection;
