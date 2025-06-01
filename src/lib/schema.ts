import { z } from 'zod';

export const ALLOW_MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
export const MAX_FILE_SIZE = 1024 * 1024 * 2;

export const roleEnum = z.enum(['guru', 'siswa', 'orangtua']);
export type Role = z.infer<typeof roleEnum>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^08\d{8,11}$/, 'Nomor HP tidak valid')
    .max(20),
  password: z.string().min(6),
  role: roleEnum,
});

export const siswaSchema = z.object({
  kelas: z.string().min(1),
  nis: z.string().min(5),
  userId: z.number().int().positive(),
});

export const guruSchema = z.object({
  nip: z.string().regex(/^\d{18}$/, 'NIP harus terdiri dari 18 digit'),
  userId: z.number().int().positive(),
});

export const nilaiSchema = z.object({
  siswaId: z.number().int().positive(),
  guruId: z.number().int().positive(),
  mataPelajaran: z.string().min(2),
  nilai: z.number().min(0).max(100),
  semester: z.enum(['Ganjil', 'Genap']),
  tahunAjaran: z.string().regex(/^\d{4}\/\d{4}$/, {
    message: 'Format tahun ajaran harus 2024/2025',
  }),
});

export const fileUploadSchema = z.object({
  file: z
    .custom<File>()
    .refine((file) => ALLOW_MIME_TYPES.includes(file.type), {
      message: 'Tipe file tidak didukung',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'Ukuran file maksimal 2MB',
    }),
});
