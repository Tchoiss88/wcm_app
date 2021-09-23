import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Auth0Provider from `next-auth/providers/auth0`;

const options = {
  providers: [
    Provider.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
