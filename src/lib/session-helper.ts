import { Session } from 'next-auth';
import { TuserSession } from '@/types';

export function mapSessionToUser(session: Session): TuserSession['user'] {
  if (!session.user) {
    throw new Error('Session user is undefined');
  }

  return {
    id: Number.parseInt(session.user.id),
    name: session.user.name ?? undefined,
    email: session.user.email,
    imgUrl: session.user.image ?? '/avatars/shadcn.jpg',
    role: session.user.role,
  };
}
