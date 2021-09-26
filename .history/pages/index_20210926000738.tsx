import { NextPage } from 'next';
import { Container, Typography, Box, Button } from '@mui/material';
import React from 'react';
import styles from '../styles/Home.module.css';
import useSWR from 'swr';

export default function Home() {
  return (
    <Container className={styles.page}>
      <Box my={4}>
        <Typography variant="h4">Here will be my main</Typography>
      </Box>
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
