import { z } from 'zod';

export const roleEnum = z.enum(['guru', 'siswa', 'orangtua']);
export type Role = z.infer<typeof roleEnum>;

export const jenisNilaiEnum = z.enum(['tugas', 'ulangan', 'uts', 'uas']);
export type JenisNilai = z.infer<typeof jenisNilaiEnum>;

export const mataPelajaranEnum = z.enum([
  'matematika',
  'bahasa_indonesia',
  'ipa',
  'ips',
  'pjok',
  'agama',
  'seni_budaya',
  'tik',
]);
export type MataPelajaran = z.infer<typeof mataPelajaranEnum>;

export const semesterEnum = z.enum(['ganjil', 'genap']);
export type Semester = z.infer<typeof semesterEnum>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  password: z.string().min(6),
  role: roleEnum,
});

export const siswaSchema = z.object({
  kelas: z.string().min(1),
  nis: z.string().min(1),
  userId: z.number(),
});

export const guruSchema = z.object({
  nip: z.string().min(1),
  userId: z.number(),
});

export const nilaiSchema = z.object({
  siswaId: z.number(),
  guruId: z.number(),
  mataPelajaran: mataPelajaranEnum,
  nilai: z.coerce.number().min(0).max(100),
  semester: semesterEnum,
  tahunAjaran: z
    .string()
    .regex(/^\d{4}\/\d{4}$/, 'Format tahun ajaran harus seperti 2024/2025'),
  jenisNilai: jenisNilaiEnum,
});
