import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from 'styles/Order.module.css';

const Order: NextPage = () => {
  return (
    <Container className={styles.page}>
      <h1>Order</h1>
    </Container>
  );
};

export default Order;
