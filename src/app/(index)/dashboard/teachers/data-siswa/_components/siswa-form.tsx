'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef } from 'react';
import { updateDataSiswa } from '../lib/actions';
import { Tusers, ActionResult } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import UploadImages from './upload-images';
import Link from 'next/link';

interface SiswaFormProps {
  data: Tusers;
}

const initialState: ActionResult = {
  error: null,
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" /> Mohon tunggu
        </>
      ) : (
        'Simpan'
      )}
    </Button>
  );
};

export default function SiswaForm({ data }: SiswaFormProps) {
  const [state, formAction] = useActionState(updateDataSiswa, initialState);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && state.redirectTo) {
      setTimeout(() => {
        router.push(state.redirectTo!);
      }, 3000);
    }
  }, [state.success, state.redirectTo, router]);

  return (
    <form action={formAction} ref={formRef} className="grid gap-4">
      {state.success && (
        <Alert variant="default">
          <AlertTitle className="text-xl text-emerald-400">
            <CheckCircle className="inline mr-2" /> Berhasil
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

      <Input type="hidden" name="userId" value={data.id} />
      <Input type="hidden" name="siswaId" value={data.siswa?.id} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UploadImages />

        <div className="space-y-1">
          <Label>Nama</Label>
          <Input name="name" defaultValue={data.name} required />
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input name="email" defaultValue={data.email} required />
        </div>
        <div className="space-y-1">
          <Label>Nomor Telepon</Label>
          <Input name="notelp" defaultValue={data.notelp} required />
        </div>
        <div className="space-y-1">
          <Label>NIS</Label>
          <Input name="nis" defaultValue={data.siswa?.nis} required />
        </div>
        <div className="space-y-1">
          <Label>Kelas</Label>
          <Input name="kelas" defaultValue={data.siswa?.kelas} required />
        </div>
        <div className="space-y-1">
          <Label>Alamat</Label>
          <Input name="alamat" defaultValue={data.siswa?.alamat} required />
        </div>
        <div className="space-y-1">
          <Label>Jenis Kelamin</Label>
          <Input
            name="jenisKelamin"
            defaultValue={data.siswa?.jenisKelamin}
            required
          />
        </div>
        <div className="space-y-1">
          <Label>Tanggal Lahir</Label>
          <Input
            type="date"
            name="tanggalLahir"
            defaultValue={data.siswa?.tanggalLahir.toISOString().split('T')[0]}
            required
          />
        </div>
        <div className="space-y-1">
          <Label>Tempat Lahir</Label>
          <Input
            name="tempatLahir"
            defaultValue={data.siswa?.tempatLahir}
            required
          />
        </div>
        <div className="space-y-1">
          <Label>Agama</Label>
          <Input name="agama" defaultValue={data.siswa?.agama} required />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outline" asChild>
          <Link href={'/dashboard/teachers/data-siswa'}>Kembali</Link>
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
