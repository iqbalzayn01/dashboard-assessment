import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ExportNilaiRow } from '@/types';

export function exportToExcel(
  data: ExportNilaiRow[],
  fileName = 'rekap_nilai.xlsx'
) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Nilai Siswa');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
}
