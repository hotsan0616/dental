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
import { FaPhoneAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import React, { useState, useEffect } from "react";
import RootLayout from "@/layouts/RootLayout";
import Image from "next/image";
import Link from "next/link";
import Divider from "@/components/divider/Divider";
import TeamCard from "@/components/cards/TeamCard";
import MapComponent from "@/components/map/MapComponent";
import ContactSection from "@/components/contact/ContactSection";
import Treatments from "@/components/treatments/Treatments";
import styles from "./Home.module.css";
import { patientApi } from "@/utils/api";
import { GoLocation } from "react-icons/go";
import { CiPhone } from "react-icons/ci";

interface Dentist {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  emailAddress: string;
  imageUrl: string;
}

interface Clinic {
  id: number;
  name: string;
  address: string;
  district: string;
  phone: string;
  openHours: string;
}

export default function Home() {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clinicsLoading, setClinicsLoading] = useState(true);
  const [clinicsError, setClinicsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await patientApi.getDentists();
        if (response.code === 0) {
          setDentists(response.dentistList);
        } else {
          setError(response.message || 'Failed to fetch dentists');
        }
      } catch (err) {
        setError('Failed to fetch dentists');
        console.error('Error fetching dentists:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchClinics = async () => {
      try {
        const response = await patientApi.getClinics();
        if (response.code === 0) {
          setClinics(response.clinicList);
        } else {
          setClinicsError(response.message || 'Failed to fetch clinics');
        }
      } catch (err) {
        setClinicsError('Failed to fetch clinics');
        console.error('Error fetching clinics:', err);
      } finally {
        setClinicsLoading(false);
      }
    };

    fetchDentists();
    fetchClinics();
  }, []);

  return (
    <RootLayout>
      {/* --- Hero Section --- */}
      <section>
        <div className={`${styles.heroContainer} container`}>
          <article>
            <h1>Your Trusted Partner for Dental Health</h1>
            <p>
              Experience exceptional dental care with our team of professionals. Schedule your appointment today!
            </p>
            <p className={styles.contactHero}>
              <Link href="/contact">
                <FaPhoneAlt />
                Contact Us
              </Link>
            </p>
          </article>
          <figure>
            <picture>
              <Image
                src={heroImage}
                alt="Modern dental care"
                fill={true}
                quality={100}
              />
            </picture>
          </figure>
        </div>
      </section>

      <Divider text="Hong Kong Dental Care" />

      {/* --- Treatments Section ---  */}
      <Treatments />

      <Divider text="Hong Kong Dental Care" />

      {/* --- Team Section ---  */}
      <section className={styles.team}>
        <div className={styles.sectionTitle}>
          <h2>Our Team</h2>
          <p>Meet our experienced dental professionals</p>
        </div>
        {loading ? (
          <div className={styles.loading}>Loading dentists...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {dentists.map((dentist) => (
              <SwiperSlide key={dentist.id}>
                <div className={styles.teamCard}>
                  <div className={styles.teamImage}>
                    <Image
                      src={dentist.imageUrl}
                      alt={`Dr. ${dentist.firstName} ${dentist.lastName}`}
                      width={300}
                      height={300}
                      className={styles.avatar}
                      priority
                    />
                  </div>
                  <div className={styles.teamInfo}>
                    <h3>{`Dr. ${dentist.firstName} ${dentist.lastName}`}</h3>
                    <p>Dental Specialist</p>
                    <Link href={`/dentist/dentist-${dentist.id}`} className={styles.resumeLink}>
                      Profile
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      <Divider text="Hong Kong Dental Care" />

      {/* --- Clinic Locations Section --- */}
      <section className={styles.clinicLocations}>
        <div className={styles.clinicLocationsContainer}>
          <div className={styles.clinicLocationsHeader}>
            <h2>Our Locations</h2>
            <p>Visit us at any of our conveniently located clinics across Hong Kong</p>
          </div>
          <div className={styles.clinicLocationsGrid}>
            {clinics.map((clinic) => (
              <div key={clinic.id} className={styles.clinicCard}>
                <div className={styles.clinicInfo}>
                  <h3>{clinic.name}</h3>
                  <div className={styles.clinicDetails}>
                    <div className={styles.clinicDetail}>
                      <GoLocation />
                      <span>{clinic.address}</span>
                    </div>
                    <div className={styles.clinicDetail}>
                      <CiPhone />
                      <span>{clinic.phone}</span>
                    </div>
                  </div>
                  <div className={styles.clinicSchedule}>
                    <h4>Opening Hours</h4>
                    <div className={styles.scheduleList}>
                      {clinic.openHours.split(',').map((schedule, index) => (
                        <div key={index} className={styles.scheduleItem}>
                          <span className={styles.day}>{schedule.split(' ')[0]}</span>
                          <span className={styles.time}>{schedule.split(' ')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection/>
    </RootLayout>
  );
}
