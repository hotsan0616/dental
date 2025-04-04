import {
  AiOutlineCheck,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";
import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <nav className={`${styles.main} container`}>
      <div className={styles.logo}>
        <Link href="/">Lorem Klinik</Link>
      </div>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h2>Tedavilerimiz</h2>
          <ul>
            <li>
              <AiOutlineCheck className={styles.icon} /> Kanal Tedavisi
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Ortodonti Tedavisi
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Çene Cerrahisi
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Implant Tedavisi
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Estetik Diş Hekimliği
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Diş Restorasyonu
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Diş Beyazlatma
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> 20’lik Diş Çekimi
              Tedavisi
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Çocuk Diş Hekimliği
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Bağlantılar</h2>
          <ul>
            <li>
              <Link href="/about-us">Hakkımızda</Link>
            </li>
            <li>
              <Link href="/contact">İletişim</Link>
            </li>
            <li>
              <Link href="/#">Gizlilik Politikası</Link>
            </li>
            <li>
              <Link href="/#">Hizmet Şartları</Link>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Bizi Takip Edin</h2>
          <div className={styles.socials}>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineInstagram />
            </Link>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineFacebook />
            </Link>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineTwitter />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
