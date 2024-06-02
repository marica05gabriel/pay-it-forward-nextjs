import NextAuth, { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { jwtDecode } from 'jwt-decode';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],

  callbacks: {
    // Token is encrypted
    async jwt({ token, account }) {
      const now = Math.floor(Date.now() / 1000);
      if (account) {
        console.log('[JWT callback] First time after sign in.');
        console.log('Account');
        console.log(account);
        console.log('Token');
        console.log(token);
        console.log(
          'Expires at: ',
          new Date(Number(account.expires_at) * 1000)
        );

        console.log('[JWT callback] End');

        token.decoded = jwtDecode(account.access_token!);
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at!;
        token.refresh_token = account.refresh_token!;
      } else if (now < Number(token.expires_at)) {
        console.log('[JWT callback] Token OK.');
        return token;
      } else if (token.refresh_token) {
        console.log('[JWT callback] Token has expired!');
        console.warn('Token has expired. Will refresh...');
        // TODO
        try {
          const newToken = await handleRefreshToken(token);
          console.info('Token refreshed successfully.');
          console.info(newToken);
          return newToken;
        } catch (error) {
          console.error('Error wile refreshing access token!');
          console.error(error);
          return { ...token, error: 'REFRESH_TOKEN_ERROR' };
        }
      }
      return token;
    },
    // Session is not encrypted
    async session({ session, token }) {
      // @ts-ignore
      session.access_token = token.access_token;
      // @ts-ignore
      session.id_token = token.id_token;
      // @ts-ignore
      session.roles = token.decoded.realm_access.roles;
      // @ts-ignore
      session.error = token.error;

      return session;
    },
  },
};

interface AdditionalProps {
  access_token: string;
  id_token: string;
  roles: string;
  error: string;
}

const handleRefreshToken = async (token: JWT) => {
  const body = new URLSearchParams({
    client_id: process.env.KEYCLOAK_CLIENT_ID!,
    client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
    grant_type: 'refresh_token',
    refresh_token: String(token.refresh_token),
  });
  console.log(body);
  const response = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body,
    method: 'POST',
  });

  if (!response.ok) {
    console.log('Refresh token error!');
    console.error(response);
    throw Error('Refresh token error!');
  }

  const newToken = await response.json();
  return {
    ...token,
    access_token: newToken.access_token,
    decoded: jwtDecode(newToken.access_token),
    id_token: newToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + newToken.expires_in,
    refreshToken: newToken.refresh_token,
  };
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
