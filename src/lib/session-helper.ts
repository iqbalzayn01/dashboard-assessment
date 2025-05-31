import { Session } from 'next-auth';
import { TuserSession } from '@/types';

export function mapSessionToUser(session: Session): TuserSession['user'] {
  if (!session.user) {
    throw new Error('Session user is undefined');
  }

  return {
    id: session.user.id,
    name: session.user.name ?? undefined,
    email: session.user.email,
    image: session.user.image ?? '/avatars/shadcn.jpg',
    role: session.user.role,
  };
}
