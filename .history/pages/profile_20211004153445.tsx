import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from 'styles/Profile.module.css';
import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import api from 'utils/api';

const Profile: NextPage = () => {
  const [session] = useSession();
  const { data, error } = useSWR(`/api/user/${session?.user.email}`, api);

  return (
    <Container className={styles.page}>
      <h1>Profile</h1>
    </Container>
  );
};

export default Profile;
