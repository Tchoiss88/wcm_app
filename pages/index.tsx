import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/Home.module.css';
import { Container, Grid, Box } from '@mui/material';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';
import api from 'utils/api';

import ItemHome from 'src/components/ItemHome';

export default function Home() {
  const [session, loading] = useSession();
  const [dataDB, setDataDB] = useState([]);

  const { data, error } = useSWR(
    `/api/user/${session ? session.user.email : ''}`,
    api
  );

  useEffect(() => {
    getAPI();
  }, []);

  const getAPI = async () => {
    // const apiData = await fetch(``);
    const allProduct = await require('../utils/data.json');
    setDataDB(allProduct);
  };

  const key = 'category';
  const categories = [
    ...new Map(dataDB.map((item) => [item[key], item])).values(),
  ];

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
        <h1>
          {` ${
            session
              ? `Welcome ${session.user.email} to WCM.`
              : 'Join us and get first order discount.'
          }`}
        </h1>
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
              <Grid item md={6} key={i}>
                <ItemHome data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
}
