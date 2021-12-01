import { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';

import { useSession, signIn, signOut } from 'next-auth';

const HomePage: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {!session && (
        <div>
          You must sign in first <br />
          <button onClick={(): Promise<void> => signIn('auth0')}>
            Sign In
          </button>
        </div>
      )}

      {session && (
        <div>
          Not signed in as{session.user.email} <br />
          <button onClick={(): Promise<void> => signOut()}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

// export async function getServerSideProps(context) {
//   const client = await clientPromise;

//   // client.db() will be the default database passed in the MONGODB_URI
//   // You can change the database by calling the client.db() function and specifying a database like:
//   // const db = client.db("myDatabase");
//   // Then you can execute queries against your database like so:
//   // db.find({}) or any of the MongoDB Node Driver commands

//   const isConnected = await client.isConnected();

//   return {
//     props: { isConnected },
//   };
// }
