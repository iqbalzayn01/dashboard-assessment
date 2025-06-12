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
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface Filterable {
  mataPelajaran: string;
  jenisNilai: string;
  semester: number;
  tahunAjaran: string;
}

interface DataTableProps<TData extends Filterable, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableNilai<TData extends Filterable, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const castedData = data as Filterable[];

  const filterOptions = {
    mataPelajaran: Array.from(new Set(castedData.map((d) => d.mataPelajaran))),
    jenisNilai: Array.from(new Set(castedData.map((d) => d.jenisNilai))),
    semester: Array.from(new Set(castedData.map((d) => d.semester))),
    tahunAjaran: Array.from(new Set(castedData.map((d) => d.tahunAjaran))),
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-4 py-4">
        <label htmlFor="filter">Filter</label>
        {(
          ['mataPelajaran', 'jenisNilai', 'semester', 'tahunAjaran'] as const
        ).map((key) => (
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
              {filterOptions[key].map((item: string | number) => (
                <SelectItem
                  key={item}
                  value={String(item)}
                  className="capitalize"
                >
                  {String(item)
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  <TableCell>
                    {table.getRowModel().rows.indexOf(row) +
                      1 +
                      table.getState().pagination.pageIndex *
                        table.getState().pagination.pageSize}
                  </TableCell>
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada hasil.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4 text-sm text-muted-foreground">
        <div>
          {table.getFilteredSelectedRowModel().rows.length} dari{' '}
          {table.getFilteredRowModel().rows.length} baris dipilih.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="cursor-pointer"
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="cursor-pointer"
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
