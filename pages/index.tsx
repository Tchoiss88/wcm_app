import React from 'react';
import styles from '../styles/Home.module.css';
import { Container, Grid, Box } from '@mui/material';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';
import api from 'utils/api';
import useStore from '../lib/store';

import ItemHome from 'src/components/ItemHome';

export default function Home() {
  const [session, loading] = useSession();

  const { data, error } = useSWR(
    `/api/user/${session ? session.user.email : ''}`,
    api
  );

  const stock = useStore((state) => state.stock);

  const key = 'category';
  const categories = [
    ...new Map(stock.map((item) => [item[key], item])).values(),
  ];

  const handleChange = (e) => {
    e.target.value;
    console.log(e.target.value, 'target');
  };

  return (
    <Container className={styles.page}>
      <Grid
        container
        spacing={{ xs: 2, md: 8 }}
        columns={{ xs: 4, sm: 4, md: 12 }}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        item
        xs={12}
      >
        <h2>
          {` ${
            session
              ? `Welcome ${session.user.email} to WCM.`
              : 'Join us and get first order discount.'
          }`}
        </h2>
      </Grid>
      <Grid></Grid>
      <Grid container item xs={12}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 4, sm: 4, md: 12 }}
          >
            {categories.map((item, i) => (
              <Grid item md={6} key={item.id}>
                <ItemHome data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}
