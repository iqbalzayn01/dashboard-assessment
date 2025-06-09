import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDataSiswaById } from '../../lib/data';
import { TypeParams } from '@/types';
import SiswaForm from '../../_components/siswa-form';
import Link from 'next/link';
import React from 'react';

export default async function EditSiswaPage({ params }: TypeParams) {
  const getParams = await params;
  const data = await getDataSiswaById(Number(getParams.id));

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 lg:p-6">
        <h2>Data siswa tidak ditemukan.</h2>
        <Link href={'/dashboard/teachers/data-siswa'}>Kembali</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Data Siswa</CardTitle>
          <CardDescription>
            Formulir edit data siswa secara lengkap.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SiswaForm data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
