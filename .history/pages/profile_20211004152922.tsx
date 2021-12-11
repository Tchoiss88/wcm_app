import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from 'styles/Profile.module.css';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import api from 'utils/api';

const Profile: NextPage = () => {
  const [session] = useSession();
  const { data } = useSWR(`/api/user/${session?.user.email}`, api);

  return (
    <Container className={styles.page}>
      <h1>{data.data.worker}</h1>
    </Container>
  );
};

export default Profile;
