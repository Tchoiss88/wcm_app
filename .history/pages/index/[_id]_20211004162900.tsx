import { GetServerSideProps } from 'next';

export default function itemDetails(): JSX.Element {
  return <h1> Item Details</h1>;
}

export const getServerSideProps: GetServerSideProps = (context) => {
  return {
    props: {
      // props for your component
    },
  };
};
