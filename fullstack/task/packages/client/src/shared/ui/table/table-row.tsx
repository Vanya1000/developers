import { Row, flexRender } from '@tanstack/react-table';

interface TableRowProps<T> {
    row: Row<T>;
}

export const TableRow = <T,>({ row }: TableRowProps<T>) => (
    <tr className="hover:bg-gray-50">
        {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
        ))}
    </tr>
);
