import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import React from "react";
import Image from "next/image";
import RootLayout from "@/layouts/RootLayout";
import styles from "./Dentist.module.css";
const DentistPage = () => {
  const { title, photoUrl, name } = useSelector(
    (state: RootState) => state.dentist
  );
  return (
    <RootLayout>
      <section className={styles.section}>
        <div className={`${styles.dentistContainer} container`}>
          <article>
            <h2 className="textHeader">{name}</h2>
            <h3
              className="textSubheader"
              style={{ color: "var(--primary-color)", fontWeight: "500" }}
            >
              {title}
            </h3>
            <h4 className="subTextHeader">Özgeçmiş</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Quibusdam consectetur officiis dolor doloribus officia provident
              debitis dolorum doloremque sit vitae dolorem quaerat, animi
              tempore eligendi exercitationem facere quis, illum veritatis qui?
              Modi a totam earum quod porro autem necessitatibus, non aliquam.
              Minima non alias cupiditate expedita quam voluptatibus at rerum
              optio odio quis, veniam natus quisquam placeat quas inventore
              praesentium illo impedit! Tempora, quo? Eius officia, itaque qui
              at earum quo, eos quia, voluptas magnam error illum saepe aut
              fugiat?
            </p>

            <h4>Sertifaklar & Konferanslar</h4>
            <p>Lorem, ipsum.</p>
          </article>
          <figure>
            <Image src={photoUrl} alt="Denist Image" fill={true} priority />
          </figure>
        </div>
      </section>
    </RootLayout>
  );
};

export default DentistPage;
