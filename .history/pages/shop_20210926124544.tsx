import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from 'styles/Order.module.css';

const Shop: NextPage = () => {
  return (
    <Container className={styles.page}>
      <h1>Shop</h1>
    </Container>
  );
};

export default Shop;
