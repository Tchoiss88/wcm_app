import React from 'react';
import styles from '../styles/Home.module.css';
import { Container, Grid } from '@mui/material';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';
import api from 'utils/api';

export default function Home() {
  const [session, loading] = useSession();

  const { data, error } = useSWR(
    `/api/user/${session ? session.user.email : ''}`,
    api
  );

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
