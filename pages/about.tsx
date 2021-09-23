import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from 'styles/About.module.css';

const About: NextPage = () => {
  return (
    <Container className={styles.page}>
      <h1>About</h1>
    </Container>
  );
};

export default About;
