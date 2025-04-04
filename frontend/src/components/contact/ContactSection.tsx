import React from "react";
import Link from "next/link";
import styles from "./ContactSection.module.css";

const ContactSection: React.FC = () => {
  return (
    <section className={styles.main}>
      <div className={`${styles.contactContainer} container-fluid`}>
        <h2 className={styles.contactHeader}>
          Sizin İçin En İyi Tedavi Çözümünü Bulmak İçin İletişime Geçin!
        </h2>
        <Link href="/contact">İletişim</Link>
      </div>
    </section>
  );
};

export default ContactSection;
