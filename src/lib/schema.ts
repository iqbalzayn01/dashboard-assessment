import { z } from 'zod';

export const ALLOW_MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];
export const MAX_FILE_SIZE = 1024 * 1024 * 2;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const nilaiSchema = z.object({
  siswaId: z.string().min(1),
  mataPelajaran: z.string().min(2),
  nilai: z.number().min(0).max(100),
  semester: z.enum(['Ganjil', 'Genap']),
  tahunAjaran: z.string().regex(/^\d{4}\/\d{4}$/),
});

export const fileUploadSchema = z.object({
  file: z
    .custom<File>()
    .refine((file) => ALLOW_MIME_TYPES.includes(file.type))
    .refine((file) => file.size <= MAX_FILE_SIZE),
});
