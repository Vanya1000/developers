import { HeaderGroup, flexRender } from '@tanstack/react-table';
import { SortingIndicator } from './sorting-indicator';

interface TableHeaderProps<T> {
    headerGroup: HeaderGroup<T>;
}

export const TableHeader = <T,>({ headerGroup }: TableHeaderProps<T>) => (
    <tr>
        {headerGroup.headers.map((header) => (
            <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
                {flexRender(header.column.columnDef.header, header.getContext())}
                <SortingIndicator header={header} />
            </th>
        ))}
    </tr>
);
