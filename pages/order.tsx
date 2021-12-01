import type { NextPage } from 'next';
import { Container, Grid, Box } from '@mui/material';
import styles from 'styles/Order.module.css';
import OrderComponent from '../src/components/Order.component';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import api from 'utils/api';

const Order: NextPage = () => {
  const [session] = useSession();

  const { data } = useSWR(`/api/user/${session?.user.email}`, api);

  const orders = data?.data.orders ? data?.data.orders : [];

  return (
    <Container className={styles.page}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <h2>{`${
          orders.length <= 0 ? 'You do not have any orders ' : 'Orders'
        }`}</h2>
      </Grid>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {orders.map((item, i) => (
            <Grid item xs={2} sm={4} md={12} key={i}>
              <OrderComponent data={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Order;
