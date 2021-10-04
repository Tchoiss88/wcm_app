import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from 'styles/CreateUser.module.css';

const CreateUser: NextPage = () => {
  return (
    <Container className={styles.page}>
      <h1>Create User</h1>
    </Container>
  );
};

export default CreateUser;
