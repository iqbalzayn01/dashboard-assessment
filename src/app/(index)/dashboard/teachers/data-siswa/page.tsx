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

import React from 'react';

export default async function DataSiswa() {
  const dataSiswa = await getDataUserSiswa();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Data Siswa</CardTitle>
          <CardDescription>
            Manage your data and view their data performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={dataSiswa} />
        </CardContent>
      </Card>
    </div>
  );
}
