export default function itemDetails(): JSX.Element {
  return <h1> Item Details</h1>;
}

export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}
