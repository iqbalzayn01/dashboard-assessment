'use client';

import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Filterable {
  mataPelajaran: string;
  semester: number;
  tahunAjaran: string;
}

interface DataTableRekapProps<TData extends Filterable, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableRekapNilai<TData extends Filterable, TValue>({
  columns,
  data,
}: DataTableRekapProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters },
  });

  const filterableKeys = ['mataPelajaran', 'semester', 'tahunAjaran'] as const;

  const filterOptions = Object.fromEntries(
    filterableKeys.map((key) => [
      key,
      Array.from(new Set(data.map((d) => d[key]).filter(Boolean))),
    ])
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-4 py-4">
        <label htmlFor="filter">Filter</label>
        {filterableKeys.map((key) => (
          <Select
            key={key}
            onValueChange={(value) =>
              table
                .getColumn(key)
                ?.setFilterValue(value === '__all__' ? undefined : value)
            }
            value={
              (table.getColumn(key)?.getFilterValue() as string) ?? '__all__'
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`Filter ${key}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__">
                Semua{' '}
                {key
                  .replace(/([a-z])([A-Z])/g, '$1 $2')
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </SelectItem>
              {filterOptions[key].map((item) => (
                <SelectItem key={String(item)} value={String(item)}>
                  {String(item)
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead>No.</TableHead>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{idx + 1}</TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
