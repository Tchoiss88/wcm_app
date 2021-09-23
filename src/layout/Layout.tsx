import { NextPage } from 'next';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: NextPage = (props) => {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
