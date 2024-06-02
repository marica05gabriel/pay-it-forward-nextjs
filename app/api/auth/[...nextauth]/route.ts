import NextAuth, { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { jwtDecode } from 'jwt-decode';

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],

  callbacks: {
    // Tokne is encrypted
    async jwt({ token, account }) {
      const now = Math.floor(Date.now() / 1000);
      if (account) {
        console.log('[JWT callback] First time after sign in.');
        console.log('Account');
        console.log(account);
        console.log('Token');
        console.log(token);
        console.log('[JWT callback] End');

        token.decoded = jwtDecode(account.access_token!);
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at!;
        token.refresh_token = account.refresh_token!;
      } else if (now < Number(token.expires_at)) {
        console.log('[JWT callback] Token not expired.');
        return token;
      } else {
        console.log('[JWT callback] Token has expired!');
        console.warn('Token has expired. Will refresh...');
        // TODO
        return token;
      }
      return token;
    },
    // Session is not encrypted
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.id_token = token.id_token;
      session.roles = token.decoded.realm_access.roles;

      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
