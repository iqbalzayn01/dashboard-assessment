export type ActionResult = {
  error: string | null;
  success?: string;
  redirectTo?: string;
};

export type Tparams = {
  id: string;
  siswaId?: string;
  nilaiId?: string;
};

export type TypeParams = {
  params: Promise<Tparams>;
};

export type TuserSession = {
  user?: {
    id: number;
    name?: string | null | undefined;
    email?: string | null | undefined;
    imgUrl?: string | null | undefined;
    role?: string | null | undefined;
  };
};

export type Tusers = {
  id: number;
  name: string;
  email: string;
  notelp: string;
  role: string;
  imgUrl?: string | null;
  siswa?: {
    id: number;
    userId: number;
    nis: string;
    kelas: string;
    alamat: string;
    jenisKelamin: string;
    tanggalLahir: Date;
    tempatLahir: string;
    agama: string;
    nilai: {
      id: number;
      mataPelajaran: string;
      nilai: number;
      semester: number;
      jenisNilai: string;
      tahunAjaran: string;
    }[];
  };
};

export type Tsiswa = {
  id: number;
  nis: string;
  kelas: string;
  alamat: string;
  jenisKelamin: string;
  tanggalLahir: Date;
  tempatLahir: string;
  agama: string;
  nilai: {
    id: number;
    mataPelajaran: string;
    nilai: number;
    semester: number;
    jenisNilai: string;
    tahunAjaran: string;
  }[];
};

export type TNilaiRow = {
  id: number;
  userId: number;
  siswaId: number;
  nis: string;
  nama: string;
  mataPelajaran: string;
  jenisNilai: string;
  nilai: number;
  semester: number;
  tahunAjaran: string;
};

export type ExportNilaiRow = {
  nama: string;
  nis: string;
  mataPelajaran: string;
  jenisNilai: string;
  nilai: number;
  semester: number;
  tahunAjaran: string;
};

export type TRekapNilaiRow = {
  mataPelajaran: string;
  semester: number;
  tahunAjaran: string;
  nilaiAkhir: number;
};
