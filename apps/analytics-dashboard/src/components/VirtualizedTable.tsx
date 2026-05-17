import { useMemo, useState, type ReactNode } from 'react';

export interface VirtualizedColumn<T> {
  key: string;
  label: string;
  width: string;
  align?: 'start' | 'center' | 'end';
  render: (row: T) => ReactNode;
}

interface VirtualizedTableProps<T extends { id: string }> {
  columns: VirtualizedColumn<T>[];
  rows: T[];
  rowHeight?: number;
  height?: number;
  emptyLabel: string;
}

function alignmentClass(align: VirtualizedColumn<unknown>['align']): string {
  if (align === 'center') {
    return 'justify-self-center text-center';
  }

  if (align === 'end') {
    return 'justify-self-end text-right';
  }

  return 'justify-self-start text-left';
}

export function VirtualizedTable<T extends { id: string }>({
  columns,
  rows,
  rowHeight = 60,
  height = 320,
  emptyLabel,
}: VirtualizedTableProps<T>): React.ReactElement {
  const [scrollTop, setScrollTop] = useState(0);

  const gridTemplateColumns = useMemo(
    () => columns.map((column) => column.width).join(' '),
    [columns]
  );

  const totalHeight = rows.length * rowHeight;
  const visibleCount = Math.ceil(height / rowHeight) + 4;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
  const endIndex = Math.min(rows.length, startIndex + visibleCount);
  const offsetY = startIndex * rowHeight;
  const visibleRows = rows.slice(startIndex, endIndex);

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/8 bg-slate-900/70">
      <div
        className="grid border-b border-white/8 bg-white/[0.03] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400"
        style={{ gridTemplateColumns }}
      >
        {columns.map((column) => (
          <div key={column.key} className={alignmentClass(column.align)}>
            {column.label}
          </div>
        ))}
      </div>

      <div
        className="overflow-y-auto"
        style={{ height }}
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      >
        {rows.length === 0 ? (
          <div className="flex h-full items-center justify-center px-6 text-sm text-slate-400">
            {emptyLabel}
          </div>
        ) : (
          <div className="relative" style={{ height: totalHeight }}>
            <div
              className="absolute inset-x-0 top-0"
              style={{ transform: `translateY(${offsetY}px)` }}
            >
              {visibleRows.map((row) => (
                <div
                  key={row.id}
                  className="grid items-center gap-3 border-b border-white/6 px-4 text-sm text-slate-200 last:border-b-0"
                  style={{
                    gridTemplateColumns,
                    minHeight: rowHeight,
                  }}
                >
                  {columns.map((column) => (
                    <div key={column.key} className={alignmentClass(column.align)}>
                      {column.render(row)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
