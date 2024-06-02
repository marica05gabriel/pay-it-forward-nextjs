import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    const idToken = session.id_token;
    const url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL!)}`;

    console.log(url);
    try {
      const response = await fetch(url, { method: 'GET' });
    } catch (error) {
      console.error(error);
      return new Response({ status: 500 });
    }
  }
  return new Response({ status: 200 });
}
