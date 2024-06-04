import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-utils';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    // @ts-ignore
    const idToken = session.id_token;
    const url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL!)}`;

    console.log(url);
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.status === 200) {
        console.log('Logout successfully. Keycloack token invalidated!');
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
      // @ts-ignore
      return new Response({ status: 500 });
    }
  }
  // @ts-ignore
  return new Response({ status: 200 });
}
