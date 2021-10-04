import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from 'styles/CreateItem.module.css';

const CreateItem: NextPage = () => {
  return (
    <Container className={styles.page}>
      <h1>Create User</h1>
    </Container>
  );
};

export default CreateItem;
