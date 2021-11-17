import type { NextPage } from 'next';
import { Container, Grid, Box, Button } from '@mui/material';
import styles from 'styles/Order.module.css';
import OrderComponent from '../src/components/Order.component';

const Order: NextPage = () => {
  return (
    <Container className={styles.page}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <h1>Order</h1>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <h2>Follow your order here</h2>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(3)).map((_, index) => (
            <Grid item xs={2} sm={4} md={12} key={index}>
              <OrderComponent />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Order;
