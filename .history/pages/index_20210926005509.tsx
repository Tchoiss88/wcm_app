import { Container, Box, Grid } from '@mui/material';
import React from 'react';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';
import api from 'utils/api';
import { getSession } from 'next-auth/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default function Home() {
  async function(
    req: NextApiRequest,
    res: NextApiResponse

  ) {
   
 }
  const session = await getSession({ req });

  const { data, error } = useSWR(`/api/user/${session}`, api);

  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }

  return (
    <Container className={styles.page}>
      <Grid>
        <h1> {`Welcome to WCM ${session ? session.name : 'yes'}`} </h1>
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
