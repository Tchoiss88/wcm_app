import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Provider from 'next-auth/providers';

const options = {
  providers: [
    Provider.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_DOMAIN,
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
