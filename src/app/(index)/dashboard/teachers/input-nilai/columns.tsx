'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tusers } from '@/types';

export const columns: ColumnDef<Tusers>[] = [
  {
    accessorKey: 'nis',
    header: 'NIS',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <span>{user.siswa?.nis}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Nama Siswa',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <span>{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'kelas',
    header: ({ column }) => {
      const uniqueKelas = new Set<string>();

      column.getFacetedRowModel().rows.forEach((row) => {
        const user = row.original;
        const kelas = user.siswa?.kelas;
        if (kelas) uniqueKelas.add(kelas);
      });

      return (
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">Kelas</span>
          <Select
            onValueChange={(value) => column.setFilterValue(value)}
            value={(column.getFilterValue() as string) ?? ''}
          >
            <SelectTrigger className="h-8 w-[160px] cursor-pointer">
              <SelectValue placeholder="Pilih kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__" className="cursor-pointer">
                Semua
              </SelectItem>
              {[...uniqueKelas].map((kelas) => (
                <SelectItem
                  key={kelas}
                  value={kelas}
                  className="cursor-pointer"
                >
                  {kelas}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.siswa?.kelas}</span>;
    },
    enableColumnFilter: true,
    filterFn: (row, _columnId, filterValue) => {
      if (filterValue === '__all__') return true;
      return row.original.siswa?.kelas === filterValue;
    },
  },
  {
    accessorKey: 'nilai',
    header: 'Nilai',
    cell: ({ row }) => {
      const user = row.original;
      const nilaiList = user.siswa?.nilai || [];
      return (
        <div className="flex flex-col gap-1">
          {nilaiList.map((nilai) => (
            <div key={nilai.id} className="flex items-center gap-2">
              <span className="font-medium">{nilai.mataPelajaran}:</span>
              <span>{nilai.nilai}</span>
            </div>
          ))}
        </div>
      );
    },
  },
];
