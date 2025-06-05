'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';
import { ActionResult } from '@/types';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitNilai, updateNilai } from '../lib/actions';
import { JenisNilai, Siswa, Nilai } from '@prisma/client';
import { mataPelajaranEnum } from '@/lib/schema';

interface NilaiFormProps {
  type?: 'ADD' | 'EDIT';
  data?: (Nilai & { siswa: Siswa }) | null;
  kelasOptions: string[];
}

const initialState: ActionResult = {
  error: '',
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

export default function NilaiForm({
  type = 'ADD',
  data,
  kelasOptions,
}: NilaiFormProps) {
  const updateWithId = (_: unknown, formData: FormData) =>
    updateNilai(_, formData, data?.id ?? 0);

  const [state, formAction] = useActionState(
    type === 'ADD' ? submitNilai : updateWithId,
    initialState
  );

  const [selectedKelas, setSelectedKelas] = React.useState<string>(
    data?.siswa?.kelas || ''
  );
  const [siswaOptions, setSiswaOptions] = React.useState<
    { id: number; name: string; nis: string }[]
  >([]);
  const [selectedSiswaId, setSelectedSiswaId] = React.useState<string>(
    data?.siswaId?.toString() || ''
  );

  React.useEffect(() => {
    if (selectedKelas) {
      fetch(`/api/siswa?kelas=${selectedKelas}`)
        .then((res) => res.json())
        .then((data) => setSiswaOptions(data));
    } else {
      setSiswaOptions([]);
    }
  }, [selectedKelas]);

  return (
    <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {state.error !== '' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="kelas">Kelas</Label>
        <Select
          value={selectedKelas}
          onValueChange={(val) => {
            setSelectedKelas(val);
            setSelectedSiswaId('');
          }}
        >
          <SelectTrigger id="kelas">
            <SelectValue placeholder="Pilih kelas" />
          </SelectTrigger>
          <SelectContent>
            {kelasOptions.map((kelas) => (
              <SelectItem key={kelas} value={kelas}>
                {kelas}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="siswaId">Siswa</Label>
        <Select
          name="siswaId"
          value={selectedSiswaId}
          onValueChange={setSelectedSiswaId}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih siswa" />
          </SelectTrigger>
          <SelectContent>
            {siswaOptions.map((siswa) => (
              <SelectItem key={siswa.id} value={siswa.id.toString()}>
                {`${siswa.nis} - ${siswa.name}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="mataPelajaran">Mata Pelajaran</Label>
        <Select
          name="mataPelajaran"
          defaultValue={data?.mataPelajaran}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih mata pelajaran" />
          </SelectTrigger>
          <SelectContent>
            {mataPelajaranEnum.options.map((mp) => (
              <SelectItem key={mp} value={mp}>
                {mp}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="nilai">Nilai</Label>
        <Input
          type="number"
          name="nilai"
          id="nilai"
          defaultValue={data?.nilai}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="semester">Semester</Label>
        <Select name="semester" defaultValue={data?.semester || ''} required>
          <SelectTrigger>
            <SelectValue placeholder="Pilih semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ganjil">Ganjil</SelectItem>
            <SelectItem value="genap">Genap</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="tahunAjaran">Tahun Ajaran</Label>
        <Input
          name="tahunAjaran"
          id="tahunAjaran"
          placeholder="2024/2025"
          defaultValue={data?.tahunAjaran}
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="jenisNilai">Jenis Nilai</Label>
        <Select name="jenisNilai" defaultValue={data?.jenisNilai} required>
          <SelectTrigger>
            <SelectValue placeholder="Pilih jenis" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(JenisNilai).map((j) => (
              <SelectItem key={j} value={j}>
                {j}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="md:col-span-2 flex justify-end gap-2">
        <SubmitButton />
      </div>
    </form>
  );
}
