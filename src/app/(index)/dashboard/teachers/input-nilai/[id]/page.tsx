import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDataSiswaById, getNilaiSiswaById } from '../lib/data';
import { TypeParams } from '@/types';
import { DataTable } from './_components/data-table';
import { columns } from './columns';
import NilaiForm from '../_components/nilai-form';
import Link from 'next/link';
import React from 'react';

export default async function InputNilaiSiswa({ params }: TypeParams) {
  const getParams = await params;
  const dataById = await getDataSiswaById(Number.parseInt(getParams.id));

  if (!dataById) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 lg:p-6">
        <h2>Data siswa tidak ditemukan.</h2>
        <Link href={'/dashboard/teachers/input-nilai'}>Kembali</Link>
      </div>
    );
  }

  const siswaId = dataById?.siswa?.id;
  const nilaiSiswaById = siswaId ? await getNilaiSiswaById(siswaId) : [];

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Input Nilai Siswa</CardTitle>
          <CardDescription>
            Input nilai siswa berdasarkan mata pelajaran.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NilaiForm data={dataById} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Nilai Siswa</CardTitle>
          <CardDescription>
            Daftar nilai siswa berdasarkan mata pelajaran.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={nilaiSiswaById} />
        </CardContent>
      </Card>
    </div>
  );
}
