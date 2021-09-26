import type { NextPage } from 'next';
import Link from 'next/link';
import styles from 'styles/Navbar.module.css';
import { Container, Box } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/client';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Navbar: NextPage = () => {
  const [session] = useSession();

  return (
    <div className={styles.navbar}>
      <Container>
        <Box className={styles.menu}>
          <MenuIcon
            className={styles.menuIcon}
            fontSize="large"
            color="secondary"
          />
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

          <Link href={`/order`}>Order</Link>
          <div className={styles.login}>
            {session ? (
              <button className={styles.btnLogin} onClick={() => signOut()}>
                Sign out
              </button>
            ) : (
              <button
                className={styles.btnLogin}
                onClick={() => signIn('auth0')}
              >
                Sign in
              </button>
            )}
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Navbar;
