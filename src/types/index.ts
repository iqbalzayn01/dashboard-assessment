export type ActionResult = {
  error: string | null;
  success?: string;
};

export type Tparams = {
  id: number;
};

export type Tedit = {
  params: Promise<Tparams>;
};

export type TuserSession = {
  user?: {
    id: number;
    name?: string | undefined;
    email?: string | null;
    imgUrl?: string | null;
    role?: string;
  };
};

export type Tusers = {
  id: number;
  name: string;
  email: string;
  role: string;
  imgUrl?: string | null;
  siswa?: {
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
};
