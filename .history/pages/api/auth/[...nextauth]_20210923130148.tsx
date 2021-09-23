import NextAuth from 'next-auth';
import AuthProvider from 'next-auth/providers';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    AuthProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
});
