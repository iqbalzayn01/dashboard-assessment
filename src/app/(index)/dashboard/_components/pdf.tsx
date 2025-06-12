'use client';

import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Font,
} from '@react-pdf/renderer';
import { ExportNilaiRow, TRekapNilaiRow } from '@/types';
import { Button } from '@/components/ui/button';
import React from 'react';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  tableWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellHeader: {
    flex: 1,
    padding: 6,
    fontWeight: 'bold',
    backgroundColor: '#eeeeee',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderRightWidth: 1,
    borderRightColor: '#000',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderRightWidth: 1,
    borderRightColor: '#000',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
  },
});

function PDFTable({
  nilai,
  rekap,
}: {
  nilai: ExportNilaiRow[];
  rekap: TRekapNilaiRow[];
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>SD NEGERI KARADENAN 01</Text>
        <Text style={styles.subHeader}>Laporan Rekapitulasi Nilai Siswa</Text>

        <Text style={styles.sectionTitle}>Daftar Nilai Detail</Text>
        <View style={styles.tableWrapper}>
          <View style={styles.tableRow}>
            {[
              'No',
              'Nama',
              'NIS',
              'Mapel',
              'Jenis',
              'Nilai',
              'Semester',
              'Thn Ajaran',
            ].map((h, i) => (
              <Text style={styles.tableCellHeader} key={i}>
                {h}
              </Text>
            ))}
          </View>
          {nilai.map((row, i) => (
            <View style={styles.tableRow} key={i}>
              {[
                i + 1,
                row.nama,
                row.nis,
                row.mataPelajaran,
                row.jenisNilai,
                row.nilai,
                row.semester,
                row.tahunAjaran,
              ].map((val, j) => (
                <Text style={styles.tableCell} key={j}>
                  {val}
                </Text>
              ))}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Rekap Nilai Per Semester</Text>
        <View style={styles.tableWrapper}>
          <View style={styles.tableRow}>
            {['No', 'Mapel', 'Semester', 'Thn Ajaran', 'Nilai Akhir'].map(
              (h, i) => (
                <Text style={styles.tableCellHeader} key={i}>
                  {h}
                </Text>
              )
            )}
          </View>
          {rekap.map((row, i) => (
            <View style={styles.tableRow} key={i}>
              {[
                i + 1,
                row.mataPelajaran,
                row.semester,
                row.tahunAjaran,
                row.nilaiAkhir,
              ].map((val, j) => (
                <Text style={styles.tableCell} key={j}>
                  {val}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

export default function PDFLink({
  nilai,
  rekap,
  fileName = 'rekap_nilai.pdf',
}: {
  nilai: ExportNilaiRow[];
  rekap: TRekapNilaiRow[];
  fileName?: string;
}) {
  return (
    <Button asChild>
      <PDFDownloadLink
        document={<PDFTable nilai={nilai} rekap={rekap} />}
        fileName={fileName}
      >
        {({ loading }) => (loading ? 'Menyiapkan PDF...' : 'Download PDF')}
      </PDFDownloadLink>
    </Button>
  );
}
