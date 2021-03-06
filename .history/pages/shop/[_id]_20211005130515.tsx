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

export default function itemDetails({
  _id,
  category,
  name,
  price,
  quantity,
  url,
}: Item): JSX.Element {
  return (
    <>
      <h1>
        Item {name} {price} {quantity} {url} {category}
      </h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const name = context.query.name as string;

  const response = await axios.get<Item>(
    `http://localhost:3000/api/item/${name}`
  );

  const item = response.data;

  return {
    props: item,
  };
};
