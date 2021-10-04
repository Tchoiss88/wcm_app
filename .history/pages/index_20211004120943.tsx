import React from 'react';
import styles from '../styles/Home.module.css';
import { Container, Grid } from '@mui/material';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';
import api from 'utils/api';

export default function Home() {
  const [session] = useSession();

  return (
    <Container className={styles.page}>
      <Grid>
        <h1>
          {` ${
            session
              ? `Welcome ${session.user.email} to WCM.`
              : 'Join us and get first order discount.'
          }`}
        </h1>
      </Grid>
    </Container>
  );
}

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
