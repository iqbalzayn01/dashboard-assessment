import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export default async function StudentsPage() {
  const session = await auth();

  if (!session || !session.user) {
    return redirect('/login-siswa');
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Halo 👋, Selamat datang {session.user.name} di Dashboard Penilaian
          </CardTitle>
          <CardDescription>
            SDN KARADENAN 01 • Tahun Ajaran 2025/2026
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild>
              <Link href={`/dashboard/students/data-diri/${session.user.id}`}>
                Data Diri
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/dashboard/students/data-nilai/${session.user.id}`}>
                Lihat Data Nilai
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
