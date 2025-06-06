import { z } from 'zod';

export const roleEnum = z.enum(['guru', 'siswa', 'orangtua']);
export type Role = z.infer<typeof roleEnum>;

export const jenisNilaiEnum = z.enum(['pr', 'tugas', 'ulangan', 'uts', 'uas']);
export type JenisNilai = z.infer<typeof jenisNilaiEnum>;

export const mataPelajaranEnum = z.enum([
  'matematika',
  'bahasa_indonesia',
  'bahasa_inggris',
  'ipa',
  'ips',
  'pjok',
  'agama',
  'seni_budaya',
  'tik',
]);
export type MataPelajaran = z.infer<typeof mataPelajaranEnum>;

export const jenisKelaminEnum = z.enum(['Laki-laki', 'Perempuan']);
export const agamaEnum = z.enum([
  'Islam',
  'Kristen',
  'Katolik',
  'Hindu',
  'Buddha',
  'Konghucu',
  'Lainnya',
]);

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  notelp: z.string().min(8),
  password: z.string().min(6),
  role: roleEnum,
  imgUrl: z.string().url().optional(),
});

export const siswaSchema = z.object({
  userId: z.number(),
  nis: z.string().min(1),
  kelas: z.string().min(1),
  alamat: z.string().min(1),
  jenisKelamin: jenisKelaminEnum,
  tanggalLahir: z.string().min(1, 'Tanggal lahir harus diisi'),
  tempatLahir: z.string().min(1),
  agama: agamaEnum,
});

export const guruSchema = z.object({
  userId: z.number(),
  nip: z.string().min(1),
  alamat: z.string(),
  jenisKelamin: jenisKelaminEnum,
  tanggalLahir: z.string(),
  tempatLahir: z.string(),
  agama: agamaEnum,
  bidangStudi: z.string(),
});

export const nilaiSchema = z.object({
  siswaId: z.number(),
  mataPelajaran: mataPelajaranEnum,
  nilai: z.coerce.number().min(0).max(100),
  semester: z.number().min(1),
  jenisNilai: jenisNilaiEnum,
  tahunAjaran: z
    .string()
    .regex(/^\d{4}\/\d{4}$/, 'Format tahun ajaran harus seperti 2024/2025'),
});
