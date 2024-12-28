import { Header } from '@tanstack/react-table';
import { SortAscIcon, SortBothIcon, SortDescIcon } from '@shared/ui';

interface SortingIndicatorProps<T> {
    header: Header<T, unknown>;
}

export const SortingIndicator = <T,>({ header }: SortingIndicatorProps<T>) => {
    if (header.column.getIsSorted() === 'desc') {
        return <SortDescIcon />;
    }

    if (header.column.getIsSorted() === 'asc') {
        return <SortAscIcon />;
    }

    return <SortBothIcon />;
};
