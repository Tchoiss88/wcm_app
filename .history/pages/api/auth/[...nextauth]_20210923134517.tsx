import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
};

export NextAuth({
  callbacks: {
    session({ session, token, user }) {
      return session; 
  },
});

export  (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
