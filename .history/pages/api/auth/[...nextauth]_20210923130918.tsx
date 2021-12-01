import NextAuth from 'next-auth';
import { options } from 'next-auth/client';
import Auth0Provider from 'next-auth/providers';

providers: [
  Auth0Provider.Auth0({
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    issuer: process.env.AUTH0_ISSUER,
  }),
];

export default (req, res) => NextAuth(req, res, options);
