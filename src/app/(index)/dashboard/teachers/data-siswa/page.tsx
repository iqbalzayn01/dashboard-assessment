import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { DataTable } from '../../_components/data-table';
import { columns } from './columns';
import { getDataSiswa } from './lib/data';
import Link from 'next/link';
import React from 'react';

export default async function DataSiswa() {
  const dataSiswa = await getDataSiswa();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Data Siswa</CardTitle>
            <CardDescription>
              Manage your data and view their data performance.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={dataSiswa} />
        </CardContent>
      </Card>
    </div>
  );
}
