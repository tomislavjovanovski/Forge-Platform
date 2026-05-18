import { type ReactNode } from 'react';
export interface VirtualizedColumn<T> {
    key: string;
    label: string;
    width: string;
    align?: 'start' | 'center' | 'end';
    render: (row: T) => ReactNode;
}
interface VirtualizedTableProps<T extends {
    id: string;
}> {
    columns: VirtualizedColumn<T>[];
    rows: T[];
    rowHeight?: number;
    height?: number;
    emptyLabel: string;
}
export declare function VirtualizedTable<T extends {
    id: string;
}>({ columns, rows, rowHeight, height, emptyLabel, }: VirtualizedTableProps<T>): React.ReactElement;
export {};
//# sourceMappingURL=VirtualizedTable.d.ts.map