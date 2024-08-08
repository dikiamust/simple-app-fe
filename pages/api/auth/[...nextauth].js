import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        try {
          const response = await fetch('http://localhost:3001/auth/google', {
            method: 'POST',
            headers: {
              accept: '*/*',
              'Api-Version': 'v1',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken: account.id_token }),
          });

          console.log('W', response);
          if (response.ok) {
            const session = await response.json();
            console.log('session ', session); 
            return session;
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
  },
});
