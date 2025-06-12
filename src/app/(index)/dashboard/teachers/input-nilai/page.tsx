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
import { getDataUserSiswa } from './lib/data';

export const metadata: Metadata = {
  title: 'Input Nilai',
  description: 'Halaman untuk guru menginput nilai siswa.',
};

export default async function InputNilaiPage() {
  const dataUserSiswa = await getDataUserSiswa();

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Data Nilai Siswa</CardTitle>
          <CardDescription>
            Daftar nilai siswa berdasarkan kelas yang dipilih.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={dataUserSiswa} hideAddButton />
        </CardContent>
      </Card>
    </div>
  );
}
