import type { NextPage } from 'next';
import { Container } from '@mui/material';

import { useSession } from 'next-auth/client';
import useSWR from 'swr';
import api from 'utils/api';
import ProfileComponent from '../src/components/ProfileComponent';

const Profile: NextPage = () => {
  const [session, loading] = useSession();
  const { data, error } = useSWR(`/api/user/${session?.user.email}`, api);

  const user = data ? data.data : false;

  console.log(user, 'user');

  return (
    <Container>
      <ProfileComponent data={user} />
    </Container>
  );
};

export default Profile;
