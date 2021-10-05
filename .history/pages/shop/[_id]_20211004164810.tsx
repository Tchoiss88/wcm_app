import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

inte;

export default function itemDetails(): JSX.Element {
  return <h1> Item Details</h1>;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const _id = context.query._id as string;

  const response = await axios.get(`http://localhost:3000/api/item/${_id}`);

  const item = response.data;
};
