import type { NextPage } from 'next';
import { Container } from '@mui/material';
import ProfileComponent from '../src/components/ProfileComponent';

const Profile: NextPage = () => {
  return (
    <Container>
      <ProfileComponent />
    </Container>
  );
};

export default Profile;
