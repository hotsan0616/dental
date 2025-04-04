import {
  heroImage,
  rootCanalImg,
  orthodontiaImg,
  maxillofacialSurgeryImg,
  implantImg,
  dentalRestorationImg,
  pediatricDentistryImg,
  teethWhiteningImg,
  toothExtractionImg,
  aestheticDentistryImg,
  DentistAvatar,
} from "@/utils/index";
import teamData from "@/data/teamData.json";
import { FaPhoneAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import React, { useState } from "react";
import RootLayout from "@/layouts/RootLayout";
import Image from "next/image";
import Link from "next/link";
import Divider from "@/components/divider/Divider";
import TeamCard from "@/components/cards/TeamCard";
import TeamMember from '@/types/teamMember';
import MapComponent from "@/components/map/MapComponent";
import ContactSection from "@/components/contact/ContactSection";
import styles from "./Home.module.css";


const teamWithImages = teamData.map((member) => ({
  ...member,
  photoUrl: DentistAvatar,
}));

export default function Home() {
  const [team, setTeam] = useState<TeamMember[]>(teamWithImages);
  return (
    <RootLayout>
      {/* --- Hero Section --- */}
      <section>
        <div className={`${styles.heroContainer} container`}>
          <article>
            <h1>Sağlıklı Gülüşler için doğru yerdesin!</h1>
            <p>
              Bugün ağız sağlığınıza öncelik verin - randevunuzu diş ekibimizle
              planlayın!
            </p>
            <p className={styles.contactHero}>
              <Link href="/contact">
                <FaPhoneAlt />
                Contact US
              </Link>
            </p>
          </article>
          <figure>
            <picture>
              <Image
                src={heroImage}
                alt="Hero Image"
                fill={true}
                quality={100}
              />
            </picture>
          </figure>
        </div>
      </section>

      <Divider text="Lorem Diş Kliniği" />

      {/* --- Treatments Section ---  */}
      <section>
        <div className="container">
          <h2 className="textHeader">Tedavilerimiz</h2>
          <h4 className="textSubheader" style={{marginBottom:"12px"}}>
            Ağız ve diş sağlığı tedavileri hakkında detaylı bilgi almak için
            bizimle iletişime geçebilirsiniz.
          </h4>
          <div className={`${styles.treatmentsContainer}`}>
            <article>
              <figure>
                <picture>
                  <Image
                    src={rootCanalImg}
                    alt="Root Canal Image"
                    fill={true}
                  />
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
        </div>
      </section>

      <Divider text="Lorem Diş Kliniği" />

      {/* --- Team Section ---  */}
      <section>
        <div className={`${styles.team} container`}>
          <h1>Ekibimiz</h1>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination]}
          >
            {team.map((member, index) => (
              <SwiperSlide key={index}>
                <TeamCard
                  photoUrl={member.photoUrl}
                  slug={member.slug}
                  name={member.name}
                  title={member.title}
                  resumeUrl={member.resumeUrl}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <Divider text="Lorem Diş Kliniği" />

      {/* --- Workhours Section ---  */}
      <section className={`${styles.workhourShowcase} container-fluid`}>
        {/* Top Wave. */}
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={styles.shapeTop}
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
        {/* Bottom Wave. */}
        <svg
          data-name="Layer 2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className={styles.shapeBottom}
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
        <div className={`${styles.workhours} container`}>
          <article>
            <h1>Diş Polikliniği Çalışma Saatleri</h1>
            <table className={styles.workhourTable}>
              <thead>
                <tr>
                  <th>Gün</th>
                  <th>Saatler</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pazartesi</td>
                  <td>09:00 - 18:00</td>
                </tr>
                <tr>
                  <td>Salı</td>
                  <td>09:00 - 18:00</td>
                </tr>
                <tr>
                  <td>Çarşamba</td>
                  <td>09:00 - 18:00</td>
                </tr>
                <tr>
                  <td>Perşembe</td>
                  <td>09:00 - 18:00</td>
                </tr>
                <tr>
                  <td>Cuma</td>
                  <td>09:00 - 18:00</td>
                </tr>
                <tr>
                  <td>Cumartesi</td>
                  <td>10:00 - 16:00</td>
                </tr>
                <tr>
                  <td>Pazar</td>
                  <td>Kapalı</td>
                </tr>
              </tbody>
            </table>
          </article>

          <figure>
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <g transform="translate(18 14)">
                  <path
                    fill="#B4DFFB"
                    d="M7.07142857,0 C2.81094622,0 0,4.89288809 0,10.9285714 C0,16.9642548 2.81094622,36 7.07142857,36 C9.55684234,36 9.83916051,20.1920244 13.1785714,20.177711 C17.1608395,20.1920244 16.8003005,36 19.2857143,36 C23.5461966,36 26.3571429,16.9642548 26.3571429,10.9285714 C26.3571429,4.89288809 23.5461966,0 19.2857143,0 C17.25,0 15.2142857,1.92857143 13.1785714,1.92857143 C11.1428571,1.92857143 9.10714286,0 7.07142857,0 Z"
                  />
                  <path
                    stroke="#FFF"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M8.17857143,3 C5.41714768,3 3.17857143,5.23857625 3.17857143,8"
                  />
                </g>
                <path
                  stroke="#FFAF40"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M31,10 L31,4 M46.2027958,16.2972042 L50.4454365,12.0545635 M52.5,31.5 L58.5,31.5 M46.2027958,46.7027958 L50.4454365,50.9454365 M31,53 L31,59 M15.7972042,46.7027958 L11.5545635,50.9454365 M9.5,31.5 L3.5,31.5 M15.7972042,16.2972042 L11.5545635,12.0545635"
                />
              </g>
            </svg>
          </figure>
        </div>
      </section>

      {/* --- Map Location Section --- */}
      <section>
        <div className="container">
          <h2 className="textHeader">Klinik Konumu</h2>
          <MapComponent />
        </div>
      </section>
      
      <ContactSection/>
    </RootLayout>
  );
}
