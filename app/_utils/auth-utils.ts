import { redirect } from 'next/navigation';
import { ROUTES, RoutesEnum } from './routes-util';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const authorizationCheck = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(ROUTES[RoutesEnum.UNAUTHORIZED]);
  }
};
