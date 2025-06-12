'use client';

import { Button } from '@/components/ui/button';
import { ExportNilaiRow, TRekapNilaiRow } from '@/types';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import dynamic from 'next/dynamic';

const PDFLink = dynamic(() => import('./pdf'), {
  ssr: false,
});

function exportToExcel(
  nilai: ExportNilaiRow[],
  rekap: TRekapNilaiRow[],
  fileName = 'rekap_nilai.xlsx'
) {
  const wb = XLSX.utils.book_new();

  const sheetNilai = XLSX.utils.json_to_sheet(nilai);
  XLSX.utils.book_append_sheet(wb, sheetNilai, 'Nilai Siswa');

  const sheetRekap = XLSX.utils.json_to_sheet(rekap);
  XLSX.utils.book_append_sheet(wb, sheetRekap, 'Rekap Nilai');

  const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
}

export default function ExportButtons({
  nilai,
  rekap,
}: {
  nilai: ExportNilaiRow[];
  rekap: TRekapNilaiRow[];
}) {
  return (
    <div className="flex gap-3 flex-wrap">
      <Button onClick={() => exportToExcel(nilai, rekap)}>
        Download Excel
      </Button>
      <PDFLink nilai={nilai} rekap={rekap} />
    </div>
  );
}
