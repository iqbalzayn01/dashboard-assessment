import { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import NilaiForm from './_components/nilai-form';
import prisma from '../../../../../../lib/prisma';

export const metadata: Metadata = {
  title: 'Input Nilai',
  description: 'Halaman untuk guru menginput nilai siswa.',
};

export default async function InputNilaiPage() {
  const kelasList = await prisma.siswa.findMany({
    select: { kelas: true },
    distinct: ['kelas'],
    orderBy: { kelas: 'asc' },
  });

  const kelasOptions = kelasList.map((k) => k.kelas);

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
    </div>
  );
}
