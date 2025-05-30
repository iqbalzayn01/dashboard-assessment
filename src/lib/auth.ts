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
      image?: string | null;
      role?: string;
    } & DefaultSession['user'];
  }

  interface JWT {
    role?: string;
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
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error('Invalid credentials.');
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error('Invalid credentials.');
          }

          const { password: _, id, role, ...userWithoutPassword } = user;

          return { ...userWithoutPassword, id: id.toString(), role };
        } catch (error) {
          console.error('Authorize error:', error);
          if (error instanceof ZodError) {
            return null;
          }
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
      if ((user as { role?: string })?.role) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          role: token.role as string,
          emailVerified: (token as any).emailVerified ?? null,
        };
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/dashboard')) {
        return url;
      }
      return `${baseUrl}/dashboard`;
    },
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
});
