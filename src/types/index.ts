export type ActionResult = {
  error: string | null;
  success?: string;
};

export type Tparams = {
  id: string;
};

export type Tedit = {
  params: Promise<Tparams>;
};
export type TuserSession = {
  user?: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
};
export type Tuser = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
};
