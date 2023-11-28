import { twMerge } from 'tailwind-merge';

type Props = {
  data: { header: string; value: string | number; isBold?: boolean }[];
};

function ResultTable({ data }: Props) {
  return (
    <table className="border-collapse border border-slate-400 bg-slate-100">
      {data.map(({ header, value, isBold }) => (
        <tr key={`${header}-${value}`}>
          <th className="border border-slate-400 p-3 font-bold">{header}</th>
          <td
            className={twMerge(
              'border border-slate-400 p-3',
              isBold ? 'font-bold' : ''
            )}
          >
            {value}
          </td>
        </tr>
      ))}
    </table>
  );
}

export default ResultTable;
