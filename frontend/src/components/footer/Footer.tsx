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
        <Link href="/">Hong Kong Dental Care</Link>
      </div>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h2>Our Treatments</h2>
          <ul>
            <li>
              <AiOutlineCheck className={styles.icon} /> Teeth Cleaning
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Tooth Filling
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Tooth Extraction
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Root Canal Treatment
            </li>
            <li>
              <AiOutlineCheck className={styles.icon} /> Dental Checkup
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Links</h2>
          <ul>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/#">Terms of Service</Link>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h2>Follow Us</h2>
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
