import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from 'styles/Navbar.module.css';
import { Container, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { signIn, signOut, useSession } from 'next-auth/client';
import useSWR from 'swr';
import api from 'utils/api';

let useClickOutside = (handler) => {
  let domNode = useRef();
  //FIXME
  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};

const Navbar: NextPage = () => {
  const [menu, setMenu] = useState(false);
  const showMenu = () => setMenu(!menu);
  const [session, loading] = useSession();
  const router = useRouter();

  const [loggedUserWithoutAccount, setLoggedUserWithoutAccount] =
    React.useState(false);

  const { data, error } = useSWR(
    !loggedUserWithoutAccount && !loading
      ? `/api/user/${session?.user.email}`
      : null,
    api
  );

  React.useEffect(() => {
    if (error) setLoggedUserWithoutAccount(true);
  }, [error]);

  const user = data?.data.userType;

  let domNode = useClickOutside(() => {
    setMenu(false);
  });

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
              <button
                className={styles.btnLogin}
                onClick={async () => {
                  await router.push('/');
                  await signOut();
                }}
              >
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

        <Box
          ref={domNode}
          className={menu ? styles.menuBoxShow : styles.menuBoxNotShow}
        >
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
            className={
              user === 'worker'
                ? styles.workerMenuShow
                : styles.workerMenuNotShow
            }
          >
            <Link href="/createItem">Create Item</Link>
            <br />
            <Link href="/createUser">Create User</Link>
            <br />
            <Link href="/stock">Stock</Link>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Navbar;
