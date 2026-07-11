import rules from '../core/rules';
import { convertToPersianNumbers } from '../utils';
import Link from './Link';

function ReferencesTable() {
  const tableData = Object.entries(rules).map(([year, { reference }]) => ({
    year,
    reference,
  }));

  return (
    <table className="w-full overflow-hidden rounded-xl border border-ink/10 text-sm">
      <thead>
        <tr className="bg-porcelain">
          <th className="p-3 text-right font-bold text-ink/70">سال مالی</th>
          <th className="p-3 text-right font-bold text-ink/70">مرجع</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map(({ reference, year }) => (
          <tr key={year} className="border-t border-ink/10">
            <td className="p-3 font-semibold">
              {convertToPersianNumbers(year)}
            </td>
            <td className="p-3">
              <Link href={reference} target="_blank" rel="noopener noreferrer">
                مشاهده مرجع
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReferencesTable;
