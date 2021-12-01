import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface Item {
  _id: string;
  category: string;
  name: string;
  root_name: string;
  genders: string;
  price: number;
  quantity: number;
  url: string;
  description: string;
  size: string;
}

export default function itemDetails(): JSX.Element {
  return <h1> Item Details</h1>;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const _id = context.query._id as string;

  const response = await axios.get<Item>(
    `http://localhost:3000/api/item/${_id}`
  );

  const item = response.data;

  return {
    props{ }
  };
};
