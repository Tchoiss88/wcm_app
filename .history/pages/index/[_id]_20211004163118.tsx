import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export default function itemDetails(): JSX.Element {
  return <h1> Item Details</h1>;
}

export const getServerSideProps: GetServerSideProps = (
  context: GetServerSidePropsContext
) => {
  context.query._id;
};
