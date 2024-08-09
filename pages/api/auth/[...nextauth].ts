import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FB_APP_ID as string,
      clientSecret: process.env.FB_APP_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          const idToken =
            account?.provider === 'facebook'
              ? account?.access_token
              : account.id_token;
          const response = await fetch(
            `http://localhost:3001/auth/${account?.provider}`,
            {
              method: 'POST',
              headers: {
                accept: '*/*',
                'Api-Version': 'v1',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ idToken }),
            }
          );

          if (response.ok) {
            const session = await response.json();
            console.log('session ', session?.data?.token);
            // Return true to indicate successful sign in
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error('Error verifying user:', error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, account }) {
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        const idToken =
          account?.provider === 'facebook'
            ? account?.access_token
            : account.id_token;
        const response = await fetch(
          `http://localhost:3001/auth/${account?.provider}`,
          {
            method: 'POST',
            headers: {
              accept: '*/*',
              'Api-Version': 'v1',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
          }
        );

        if (response.ok) {
          const session = await response.json();
          token.token = session?.data?.token;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.token as string;
      return session;
    },
  },
});
