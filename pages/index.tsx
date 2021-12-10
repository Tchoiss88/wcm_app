import React from 'react';
import styles from '../styles/Home.module.css';
import { Container, Grid, Box } from '@mui/material';
import { useSession } from 'next-auth/client';
import useStore from '../lib/store';
import ItemHome from 'src/components/ItemHome';
import useSWR from 'swr';
import api from 'utils/api';

export default function Home() {
  const [session] = useSession();
  // FIXME
  const { data } = useSWR(`/api/user/${session?.user.email}`, api);

  function getUserName() {
    let arrayName = data?.data.fullName.split(' ');
    let firstName = arrayName[0];
    let lastName = arrayName[arrayName.length - 1];

    return `${firstName} ${lastName}`;
  }

  let userName = data?.data.fullName ? getUserName() : '';

  const stock = useStore((state) => state.stock);

  const key = 'category';

  const categories = [
    ...new Map(stock.map((item) => [item[key], item])).values(),
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
        <h2>
          {` ${
            session
              ? `Welcome ${userName} to WCM.`
              : 'Join us and get first order discount.'
          }`}
        </h2>
      </Grid>
      <Grid>
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
