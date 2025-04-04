import {
  rootCanalImg,
  orthodontiaImg,
  maxillofacialSurgeryImg,
  implantImg,
  dentalRestorationImg,
  pediatricDentistryImg,
  teethWhiteningImg,
  toothExtractionImg,
  aestheticDentistryImg,
} from "@/utils/index";
import { CiCalendarDate, CiStethoscope } from "react-icons/ci";
import { RiToothLine } from "react-icons/ri";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import RootLayout from "@/layouts/RootLayout";
import ContactSection from "@/components/contact/ContactSection";
import styles from "./Treatments.module.css";
const Treatments: React.FC = () => {
  return (
    <RootLayout>
      {/* --- Hero Section --- */}
      <section className={`${styles.main} container-fluid`}>
        <div className={`${styles.treatmentsHero}`}>
          <h2 className={styles.textHeaderHero}>Tedavilerimiz</h2>
          <p className={styles.subTextheaderHero}>
            Uzman,tecrübeli ve gelişmiş bilimsel teknolojik cihazlarla
            gülümseminize yeniden kavuşun!
          </p>
        </div>
      </section>

      {/* --- Treatment Steps Section --- */}
      <section className={`${styles.section}`}>
        <div className={`${styles.main} container`}>
          <h2 className={styles.stepsHeader}>Lorem, ipsum.</h2>
          <p className={styles.stepsSubheader}>
            Ağız ve diş sağlığı tedavileri hakkında detaylı bilgi almak için
            bizimle iletişime geçebilirsiniz.
          </p>
          <div className={styles.stepsContainer}>
            <article>
              <h4>
                <CiCalendarDate size={24} /> Randevu Talebi
              </h4>
              <p>Web sitemizden veya telefonla randevu talebinde bulunun.</p>
            </article>
            <article>
              <h4>
                <CiStethoscope size={24} /> Özel Danışmanlık
              </h4>
              <p>Uzmanlarımızla ihtiyaçlarınızı değerlendiriyoruz.</p>
            </article>
            <article>
              <h4>
                <RiToothLine size={24} /> Kişiye Özel Tedavi Planı
              </h4>
              <p>Size özel tedavi planı oluşturuyoruz.</p>
            </article>
            <article>
              <h4>
                <MdOutlineHealthAndSafety size={24} /> Takip ve Destek
              </h4>
              <p>Tedavi sonrası düzenli takip ve destek sağlıyoruz.</p>
            </article>
          </div>
        </div>
      </section>

      {/* --- Treatments Showcase --- */}
      <section className={`${styles.section}`}>
        <h2 className="textHeader container">Tedavilerimiz</h2>
        <div className={`${styles.treatmentsContainer} container`}>
          <article>
            <figure>
              <picture>
                <Image src={rootCanalImg} alt="Root Canal Image" fill={true} />
              </picture>
            </figure>
            <span>Kanal Tedavisi</span>
          </article>
          <article>
            <figure>
              <picture>
                <Image
                  src={orthodontiaImg}
                  alt="Orthodontial Image"
                  fill={true}
                />
              </picture>
            </figure>
            <span>Ortodonti</span>
          </article>
          <article>
            <figure>
              <picture>
                <Image
                  src={maxillofacialSurgeryImg}
                  alt="mMaxillofacial Surgery Image"
                  fill={true}
                />
              </picture>
            </figure>
            <span>Çene Cerrahisi</span>
          </article>
          <article>
            <figure>
              <picture>
                <Image
                  src={implantImg}
                  alt="Implant Operation Image"
                  fill={true}
                />
              </picture>
            </figure>
            <span>İmplant Tedavisi</span>
          </article>
          <article>
            <figure>
              <picture>
                <Image
                  src={aestheticDentistryImg}
                  alt="Aesthetic Dentistry Image"
                  fill={true}
                />
              </picture>
            </figure>
            <span>Estetik Diş Hekimliği</span>
          </article>
          <article>
            <figure>
              <picture>
                <Image
                  src={dentalRestorationImg}
                  alt="Dental Restoration Image"
                  fill={true}
                />
              </picture>
            </figure>
            <span>Diş Restorasyonu</span>
          </article>

          <article>
            <figure>
              <picture>
                <Image
                  src={teethWhiteningImg}
                  alt="Teeth Whitening Image"
                  fill={true}
                />
              </picture>
            </figure>
            <span>Diş Beyazlatma</span>
          </article>

          <article>
            <figure>
              <picture>
                <Image
                  src={toothExtractionImg}
                  alt="Tooth Extraction Image"
                  fill={true}
                />
              </picture>
            </figure>
            <span>Yirmilik Diş Çekimi</span>
          </article>

          <article>
            <figure>
              <picture>
                <Image
                  src={pediatricDentistryImg}
                  alt="Pediatric Dentistry Image"
                  fill={true}
                />
              </picture>
            </figure>
            <span>Çocuk Diş Hekimliği</span>
          </article>
        </div>
      </section>
      <ContactSection />
    </RootLayout>
  );
};

export default Treatments;
