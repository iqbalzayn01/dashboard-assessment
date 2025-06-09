'use client';

import { ColumnDef } from '@tanstack/react-table';
import { TNilaiRow } from '@/types';
import { Button } from '@/components/ui/button';
import FormDelete from '../../_components/delete-nilai-form';
import Link from 'next/link';

export const columns: ColumnDef<TNilaiRow>[] = [
  {
    accessorKey: 'mataPelajaran',
    header: 'Mata Pelajaran',
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.mataPelajaran
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())}
      </span>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'jenisNilai',
    header: 'Jenis Nilai',
    cell: ({ row }) => (
      <span className="uppercase">{row.original.jenisNilai}</span>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'semester',
    header: 'Semester',
    cell: ({ row }) => <span>{row.original.semester}</span>,
    enableColumnFilter: true,
    filterFn: (row, _, value) =>
      value === '__all__' || row.original.semester.toString() === value,
  },
  {
    accessorKey: 'tahunAjaran',
    header: 'Tahun Ajaran',
    cell: ({ row }) => <span>{row.original.tahunAjaran}</span>,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'nilai',
    header: 'Nilai',
    cell: ({ row }) => <span>{row.original.nilai}</span>,
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link
              href={`/dashboard/teachers/input-nilai/input/${data.userId}/edit-nilai/${data.siswaId}/${data.id}`}
            >
              Edit
            </Link>
          </Button>
          <FormDelete id={data.id} />
        </div>
      );
    },
  },
];
