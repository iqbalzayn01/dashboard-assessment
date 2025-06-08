import { ZodError } from 'zod';
import { signInSchema } from '@/lib/schema';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      imgUrl?: string | null;
      role?: string;
      emailVerified?: Date | null;
    } & DefaultSession['user'];
  }

  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    imgUrl?: string | null;
    role?: string;
    emailVerified?: Date | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) throw new Error('Invalid credentials');

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) throw new Error('Invalid credentials');

          const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            password: _password,
            id,
            role,
            imgUrl,
            ...userWithoutPassword
          } = user;

          return {
            ...userWithoutPassword,
            id: id.toString(),
            role,
            imgUrl,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          if (error instanceof ZodError) return null;
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as { role?: string }).role;
        token.imgUrl = (user as { imgUrl?: string }).imgUrl ?? null;
        token.emailVerified =
          (user as { emailVerified?: string }).emailVerified ?? null;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          role: token.role as string,
          imgUrl: token.imgUrl as string,
          emailVerified: token.emailVerified
            ? new Date(token.emailVerified as string)
            : null,
        };
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
});
