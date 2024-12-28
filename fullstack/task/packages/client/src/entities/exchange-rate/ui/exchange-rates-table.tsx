import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ExchangeRate } from '@shared/api/models.gen';
import { TableHeader } from '@shared/ui/table/table-header';
import { TableRow } from '@shared/ui/table/table-row';

const columnHelper = createColumnHelper<ExchangeRate>();

interface ExchangeRatesTableProps {
    exchangeRates: ExchangeRate[];
}

export const ExchangeRatesTable: React.FC<ExchangeRatesTableProps> = ({ exchangeRates }) => {
    const columns = [
        columnHelper.accessor('country', {
            header: 'Country',
            cell: (info) => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('currency', {
            header: 'Currency',
            cell: (info) => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('amount', {
            header: 'Amount',
            cell: (info) => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('code', {
            header: 'Code',
            cell: (info) => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor('rate', {
            header: 'Rate',
            cell: (info) => info.getValue().toFixed(3),
            enableSorting: true,
        }),
    ];

    const table = useReactTable({
        data: exchangeRates,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableHeader key={headerGroup.id} headerGroup={headerGroup} />
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} row={row} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
