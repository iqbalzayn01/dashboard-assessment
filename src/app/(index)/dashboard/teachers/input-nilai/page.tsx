import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '../../_components/data-table';
import { columns } from './columns';
import { getDataSiswa, getAllKelas } from './lib/data';
import NilaiForm from './_components/nilai-form';
import prisma from '../../../../../../lib/prisma';

export const metadata: Metadata = {
  title: 'Input Nilai',
  description: 'Halaman untuk guru menginput nilai siswa.',
};

export default async function InputNilaiPage() {
  const dataSiswa = await getDataSiswa();
  const kelasList = await getAllKelas();

  const kelasOptions = kelasList.map((k) => k);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Input Nilai Siswa</CardTitle>
          <CardDescription>
            Pilih kelas dan siswa, lalu masukkan nilai sesuai mata pelajaran.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NilaiForm kelasOptions={kelasOptions} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Nilai Siswa</CardTitle>
          <CardDescription>
            Daftar nilai siswa berdasarkan kelas yang dipilih.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={dataSiswa} />
        </CardContent>
      </Card>
    </div>
  );
}
