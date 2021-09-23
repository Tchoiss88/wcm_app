import type { NextPage } from 'next';
import { Container, Grid, Button, Box } from '@mui/material';
import React from 'react';
import styles from 'styles/SignIn.module.css';

const JoinUs: NextPage = () => {
  return (
    <Container className={styles.page}>
      <Box className={styles.signIn}>
        <h1>Sign In</h1>
        <Grid>
          <InputLabel>Email</InputLabel>
          <Input />
        </Grid>
        <Grid>
          <InputLabel>Password</InputLabel>
          <Input />
        </Grid>
        <Grid>
          <Button variant="contained" color="primary">
            Sign In
          </Button>
        </Grid>
      </Box>
      <Box className={styles.signUp}>
        <h1>Sign In</h1>
      </Box>
    </Container>
  );
};

export default JoinUs;
