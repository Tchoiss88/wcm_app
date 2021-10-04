import type { NextPage } from 'next';
import React from 'react';
import Link from 'next/link';
import styles from 'styles/Navbar.module.css';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useState } from 'react';
import useSWR from 'swr';

import { Container, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import api from 'utils/api';

const Navbar: NextPage = () => {
  const [menu, setMenu] = useState(false);
  const showMenu = () => setMenu(!menu);
  const [session] = useSession();

  const { data } = useSWR(`/api/user/${session?.user.email}`, api);
  const user = data ? data.data.worker : false;

  console.log(session, 'session');
  console.log(data, 'data');
  console.log(user, 'user');

  return (
    <div className={styles.navbar}>
      <Container>
        <Box className={styles.menu}>
          <MenuIcon
            className={styles.menuIcon}
            fontSize="large"
            color="secondary"
            onClick={showMenu}
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

        <Box className={menu ? styles.menuBoxShow : styles.menuBoxNotShow}>
          <Link href="/shop">Shop</Link> <br />
          <div
            className={
              session ? styles.customerMenuShow : styles.customerMenuNotShow
            }
          >
            <Link href="/profile">Profile</Link> <br />
            <Link href="/order">Order</Link> <br />
          </div>
          <div
            className={user ? styles.workerMenuShow : styles.workerMenuNotShow}
          >
            <Link href="/createItem">Create Item</Link>
            <br />
            <Link href="/createUser">Create User</Link>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Navbar;
