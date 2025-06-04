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
    image?: string | '/avatars/shadcn.jpg';
    role?: string;
  };
};

export type Tusers = {
  id: number;
  name: string;
  email: string;
  role: string;
  siswa?: {
    id: number;
    nis: string;
    kelas: string;
  };
};
