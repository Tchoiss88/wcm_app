import React from 'react';
import type { NextPage } from 'next';
import { Grid, Box } from '@mui/material';
import styles from 'styles/Order.module.css';
import OrderComponent from '../src/components/Order.component';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import api from 'utils/api';
import useStore from 'lib/store';

const Order: NextPage = () => {
  const [session, loading] = useSession();

  const [loggedUserWithoutAccount, setLoggedUserWithoutAccount] =
    React.useState(false);

  const { data, error } = useSWR(
    !loggedUserWithoutAccount && !loading
      ? `/api/user/${session?.user.email}`
      : null,
    api
  );

  const orders = useStore((state) => state.orders);

  return (
    <Box className={styles.page}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <h2>Orders</h2>
      </Grid>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data?.data.userType === 'client'
            ? orders
                .filter((order) => order.email === data.data.email)
                .map((item, i) => (
                  <Grid item xs={2} sm={4} md={12} key={i}>
                    <OrderComponent data={item} />
                  </Grid>
                ))
            : orders.map((item, i) => (
                <Grid item xs={2} sm={4} md={12} key={i}>
                  <OrderComponent data={item} />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Order;
