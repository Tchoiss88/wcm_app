/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../../styles/Footer.module.css';
import logo from '../img/logo.png';

const Footer: NextPage = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <Image src={logo} alt="my logo" width={115} height={125} />
      </div>
      <div className={styles.contacts}>
        <p>ibrahim.ferreira@gmail.com</p>
      </div>
    </div>
  );
};

export default Footer;
