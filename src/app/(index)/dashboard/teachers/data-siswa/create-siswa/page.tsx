import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import SiswaForm from '../_components/siswa-form';

export default function CreateSiswa() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Input Data Siswa</CardTitle>
          <CardDescription>Input data siswa secara lengkap.</CardDescription>
        </CardHeader>
        <CardContent>
          <SiswaForm type="ADD" />
        </CardContent>
      </Card>
    </div>
  );
}
