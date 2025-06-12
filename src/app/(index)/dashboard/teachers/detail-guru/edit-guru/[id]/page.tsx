import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDataUserGuruById } from '../../../lib/data';
import { TypeParams } from '@/types';
import GuruForm from '../../_components/guru-form';
import Link from 'next/link';
import React from 'react';

export default async function EditGuruPage({ params }: TypeParams) {
  const getParams = await params;
  const data = await getDataUserGuruById(Number(getParams.id));

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 lg:p-6">
        <h2>Data siswa tidak ditemukan.</h2>
        <Link href={'/dashboard/teachers'}>Kembali</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Data Profil</CardTitle>
          <CardDescription>
            Formulir edit data guru secara lengkap.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GuruForm data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
