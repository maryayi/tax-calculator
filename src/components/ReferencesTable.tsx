import { twMerge } from 'tailwind-merge';
import rules from '../core/rules';
import { convertToPersianNumbers } from '../utils';
import Link from './Link';

function ReferencesTable() {
  const tableData = Object.entries(rules).map(([year, { reference }]) => ({
    year,
    reference,
  }));

  return (
    <table className="border-collapse border border-slate-400 bg-slate-100">
      <tr>
        <th className="border border-slate-400 p-3 font-bold text-center">
          سال مالی
        </th>
        <th className="border border-slate-400 p-3 font-bold text-center">
          مرجع
        </th>
      </tr>
      {tableData.map(({ reference, year }, index: number) => (
        <tr key={index}>
          <td className="border border-slate-400 p-3 text-center">
            {convertToPersianNumbers(year, { useGrouping: false })}
          </td>
          <td className={twMerge('border border-slate-400 p-3 text-center')}>
            <Link href={reference} target="_blank" rel="noopener noreferrer">
              مرجع
            </Link>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default ReferencesTable;
