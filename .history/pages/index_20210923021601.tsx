import {NextPage} from 'next'
import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/client';

const Home: NextPage=() =>{
  const { data: session } = useSession();
  return (
    <div className="container">
      if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
      )
  }
      return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
      )
    </div>
  );
};
    


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
