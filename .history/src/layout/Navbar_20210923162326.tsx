import { NextComponentType } from 'next';
import type { NextPage } from 'next';
import Link from 'next/link';
import styles from 'styles/Navbar.module.css';
import { Container, Box } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/client';
import HomeIcon from '@mui/icons-material/Home';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Navbar: NextPage = () => {
  const [session, loading] = useSession();
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );

  return (
    <div className={styles.navbar}>
      <Container>
        <Box className={styles.menu}>
          <Link href="/">
            {
              <HomeIcon
                className={styles.menuHomeIcon}
                fontSize="large"
                color="secondary"
              />
            }
          </Link>
        </Box>
        <Box>
          <Link href="/shopBag">
            {
              <ShoppingBasketIcon
                className={styles.linkShoppingBag}
                fontSize="large"
                color="secondary"
              />
            }
          </Link>
        </Box>
        <Box className={styles.links}>
          <Link href="/about">About</Link>
          <Link href="/order">Order</Link>
          <Link href="/signIn">Sign In</Link>
        </Box>
      </Container>
    </div>
  );
};

export default Navbar;
