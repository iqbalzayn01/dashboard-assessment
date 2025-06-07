'use client';

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { submitNilai } from '../lib/actions';
import { JenisNilai, MataPelajaran } from '@prisma/client';
import { ActionResult, Tusers } from '@/types';
import Link from 'next/link';
import React from 'react';

interface NilaiFormProps {
  data?: Tusers | null;
}

const initialState: ActionResult = {
  error: '',
  success: '',
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Mohon tunggu
        </>
      ) : (
        'Simpan'
      )}
    </Button>
  );
};

export default function NilaiForm({ data }: NilaiFormProps) {
  const [state, formAction] = useActionState(submitNilai, initialState);

  if (!data) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Data siswa tidak ditemukan.</AlertDescription>
      </Alert>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      {state.success && (
        <Alert variant="default">
          <AlertTitle className="text-xl text-emerald-400">
            <CheckCircle className="inline mr-2" />
            Berhasil
          </AlertTitle>
          <AlertDescription>{state.success}</AlertDescription>
        </Alert>
      )}

      {state.error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="hidden" name="siswaId" value={data.siswa?.id} />

        <div className="space-y-1">
          <Label htmlFor="name">Nama Siswa</Label>
          <Input
            name="name"
            placeholder="Nama Siswa"
            defaultValue={data.name}
            disabled
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="kelas">Kelas</Label>
          <Input
            name="kelas"
            placeholder="Kelas"
            defaultValue={data.siswa?.kelas || ''}
            disabled
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="mataPelajaran">Mata Pelajaran</Label>
          <Select name="mataPelajaran" required>
            <SelectTrigger>
              <SelectValue placeholder="Pilih pelajaran" />
            </SelectTrigger>
            <SelectContent className="uppercase">
              {Object.values(MataPelajaran).map((mp) => {
                const formatted = mp
                  .split('_')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');

                return (
                  <SelectItem key={mp} value={mp}>
                    {formatted}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="nilai">Nilai</Label>
          <Input type="number" name="nilai" required />
        </div>

        <div className="space-y-1">
          <Label htmlFor="semester">Semester</Label>
          <Input type="number" name="semester" required />
        </div>

        <div className="space-y-1">
          <Label htmlFor="tahunAjaran">Tahun Ajaran</Label>
          <Input name="tahunAjaran" placeholder="2024/2025" required />
        </div>

        <div className="space-y-1">
          <Label htmlFor="jenisNilai">Jenis Nilai</Label>
          <Select name="jenisNilai" required>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis" />
            </SelectTrigger>
            <SelectContent className="uppercase">
              {Object.values(JenisNilai).map((j) => {
                const formatted = j
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
                return (
                  <SelectItem key={j} value={j}>
                    {formatted}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2 flex justify-end gap-4">
          <Button variant={'outline'} asChild>
            <Link href={'/dashboard/teachers/input-nilai'}>Kembali</Link>
          </Button>
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
