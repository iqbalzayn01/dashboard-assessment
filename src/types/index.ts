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
    name?: string | undefined;
    email?: string | null;
    image?: string | '/avatars/shadcn.jpg';
    role?: string;
  };
};
