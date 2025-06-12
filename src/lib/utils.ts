import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { JenisNilai, jenisNilaiEnum } from '@/lib/schema';
import { TNilaiRow, TRekapNilaiRow } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
}

const bobotNilai: Record<JenisNilai, number> = {
  pr: 0.1,
  tugas: 0.2,
  ulangan: 0.2,
  uts: 0.2,
  uas: 0.3,
};

export function groupAndRekapNilai(data: TNilaiRow[]): TRekapNilaiRow[] {
  const grouped: Record<
    string,
    TRekapNilaiRow & { _komponen: Partial<Record<JenisNilai, number>> }
  > = {};

  for (const row of data) {
    const key = `${row.mataPelajaran}-${row.semester}-${row.tahunAjaran}`;
    if (!grouped[key]) {
      grouped[key] = {
        mataPelajaran: row.mataPelajaran,
        semester: row.semester,
        tahunAjaran: row.tahunAjaran,
        nilaiAkhir: 0,
        _komponen: {},
      };
    }

    grouped[key]._komponen[row.jenisNilai as JenisNilai] = row.nilai;
  }

  return Object.values(grouped).map(({ _komponen, ...rest }) => {
    let total = 0;
    let totalBobot = 0;

    for (const jenis of jenisNilaiEnum.options) {
      const nilai = _komponen[jenis];
      const bobot = bobotNilai[jenis];
      if (nilai !== undefined) {
        total += nilai * bobot;
        totalBobot += bobot;
      }
    }

    return {
      ...rest,
      nilaiAkhir:
        totalBobot > 0 ? parseFloat((total / totalBobot).toFixed(2)) : 0,
    };
  });
}
