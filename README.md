# 📘 SD Negeri Karadenan 01 — Dashboard Sekolah Digital

Website resmi **SD Negeri Karadenan 01**:  
🌐 [https://www.sdnegerikaradenan01.site](https://www.sdnegerikaradenan01.site)  
Sistem informasi akademik berbasis web modern untuk sekolah dasar, mendukung peran Guru, Siswa, dan Orang Tua dalam proses pembelajaran dan penilaian digital.

---

## ✨ Fitur Utama

- 🧑‍🏫 Dashboard Guru: Input & edit nilai, data siswa, dan pengelolaan informasi akademik.
- 🧒 Dashboard Siswa: Melihat nilai dan detail profil pribadi.
- 👨‍👩‍👧 Dashboard Orang Tua: Pantau nilai anak dan informasi pribadi.
- 🖼️ Upload foto profil siswa & guru.
- 📊 Rekap nilai dalam bentuk Excel & PDF.
- 🎨 UI modern & interaktif menggunakan `shadcn/ui`, `magicui.design`, dan `framer-motion`.

---

## 🛠️ Teknologi yang Digunakan

| Teknologi          | Deskripsi                                                   |
| ------------------ | ----------------------------------------------------------- |
| **Next.js 14**     | Framework React fullstack dengan App Router.                |
| **React 18**       | Library UI utama.                                           |
| **Auth.js**        | Autentikasi serverless berbasis role (guru/siswa/orangtua). |
| **Supabase**       | Database PostgreSQL dan storage untuk file upload.          |
| **Prisma ORM**     | Manajemen data dan skema relasional secara efisien.         |
| **Shadcn/ui**      | Komponen UI modular dan stylish berbasis Tailwind.          |
| **MagicUI.design** | Komponen & animasi interaktif siap pakai.                   |
| **Framer Motion**  | Animasi UI halus dan responsif.                             |
| **Vercel**         | Hosting & deployment CI/CD (Next.js ready).                 |
| **pnpm**           | Paket manager ringan dan cepat untuk dependency.            |

---

## 🚀 Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/username/sd-karadenan01.git
cd sd-karadenan01
```

### 2. Install Dependency

```bash
pnpm install
```

### 3. Buat File Environment

Buat file `.env` berdasarkan `.env.example`:

```bash
cp .env.example .env
```

Isi variabel seperti:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
AUTH_SECRET=...
AUTH_URL=...
```

### 4. Setup Database via Prisma

```bash
pnpm dlx prisma generate
pnpm dlx prisma migrate dev --name init
```

### 5. Jalankan Server Lokal

```bash
pnpm dev
```

Website akan berjalan di:  
🔗 `http://localhost:3000`

---

## 🧪 Testing dan Reset Database

### Reset Database (Opsional, Dev Only)

```bash
pnpm dlx prisma migrate reset
```

---

## 🧩 Struktur Folder Penting

```
/app
  /dashboard
    /teachers
    /students
    /parents
/components
  /ui       ← komponen shadcn
  /magicui  ← animasi dan efek khusus
/lib
  auth.ts   ← konfigurasi Auth.js
  prisma.ts ← koneksi Prisma
  supabase/ ← helper untuk upload, delete file
/types
  index.ts  ← definisi tipe untuk user, siswa, guru
```

---

## 🔐 Roles & Autentikasi

- `guru`: akses penuh terhadap input & edit data siswa.
- `siswa`: hanya melihat data dan nilai pribadi.
- `orangtua`: melihat data & nilai anak terkait.

Autentikasi menggunakan `Auth.js`, session ditangani secara server-side.

---

## 📤 Deployment

Project ini menggunakan **Vercel** untuk deployment:

- Auto deploy saat push ke `main`
- Preview deploy untuk PR
- Perlu konfigurasi environment variables di dashboard Vercel

---

## 📷 Fitur Tambahan

- **Upload Foto Profil**  
  Upload disimpan ke Supabase Storage dan ditampilkan dengan `next/image`.

- **Download Nilai**
  - Format **Excel** → SheetJS (`xlsx`)
  - Format **PDF** → `@react-pdf/renderer`

---

## 👨‍💻 Kontribusi

Untuk berkontribusi:

1. Fork repo
2. Buat branch baru (`feat/nama-fitur`)
3. Commit dan push
4. Buat Pull Request

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan edukasi & digitalisasi sekolah.  
Hak cipta © 2025 SD Negeri Karadenan 01.  
Penggunaan ulang hanya dengan izin.

---
