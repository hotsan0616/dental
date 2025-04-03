import {
  DentistAvatar,
  ClinicPhotoOne,
  ClinicPhotoTwo,
  ClinicPhotoThree,
  ClinicPhotoFour,
  ClinicPhotoFive,
  ClinicPhotoSix,
  ClinicPhotoSeven,
  ClinicPhotoEight,
  ClinicPhotoNine,
  aboutUsImage,
} from "@/utils/index";
import React, { useState } from "react";
import Image from "next/image";
import RootLayout from "@/layouts/RootLayout";
import styles from "./Aboutus.module.css";
import CountUp from "@/components/countup/CountUp";
import TeamMember from "@/types/teamMember";
import TeamCard from "@/components/cards/TeamCard";
import ImageModal from "@/components/modals/ImageModal";
import teamData from "@/data/teamData.json";
import ContactSection from "@/components/contact/ContactSection";

const teamWithImages = teamData.map((member) => ({
  ...member,
  photoUrl: DentistAvatar,
}));

const Aboutus: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(teamWithImages);
  const [images] = useState([
    ClinicPhotoOne,
    ClinicPhotoTwo,
    ClinicPhotoThree,
  ]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  return (
    <RootLayout>
      {/* --- Hero Section --- */}
      <section className={`${styles.aboutusHero} container-fluid`}>
        <h2>Hong Kong Dental Care</h2>
        <p>
          We're here to provide you with exceptional dental care. Don't hesitate to contact us
          for appointments or any questions you may have.
        </p>
      </section>

      {/* --- About us Section --- */}
      <section>
        <div className={`${styles.aboutUsContainer} container`}>
          <h2 className={`${styles.titleMobile} textHeader`}>About Us</h2>
          <div className={styles.aboutUsWrapper}>
            <article>
              <p>
                Welcome to Hong Kong Dental Care, where we combine advanced dental technology
                with compassionate care to deliver the highest quality dental services. Our
                state-of-the-art facilities and experienced team of professionals are
                dedicated to ensuring your optimal oral health and beautiful smile.
              </p>

              <p>
                With years of experience in the field, our dental professionals specialize
                in a comprehensive range of treatments, from routine check-ups to complex
                dental procedures. We pride ourselves on staying at the forefront of dental
                innovation while maintaining a warm, patient-centered approach to care.
              </p>

              <p>
                Our commitment to excellence extends beyond technical expertise. We believe
                in creating a comfortable and welcoming environment where patients can feel
                at ease. Our team takes the time to understand your unique needs and
                concerns, ensuring personalized care that meets your specific requirements.
              </p>

              <h4 className={styles.articleSubHeader}>Our Commitment to You</h4>
              <p>
                Patient safety and satisfaction are our top priorities. We maintain the
                highest standards of sterilization and follow strict health protocols to
                ensure your safety. Our clinics are equipped with modern technology and
                staffed by highly trained professionals who are passionate about dental
                healthcare.
              </p>

              <p>
                We believe in preventive care and patient education, helping you maintain
                excellent oral health long after your visit. Our team is always available
                to answer your questions and provide guidance on maintaining your dental
                health between visits.
              </p>
            </article>
            <figure>
              <picture>
                <Image
                  src={aboutUsImage}
                  alt="Hong Kong Dental Care Clinic"
                  fill={true}
                />
              </picture>
            </figure>
          </div>
        </div>
      </section>

      {/* --- Count up Section --- */}
      <section>
        <div className={`${styles.countUpContainer} container`}>
          <h2 className="textHeader">Your Trusted Dental Care Partner</h2>
          <CountUp clients={1000} experience={15} team={10} />
        </div>
      </section>

      {/* --- Gallery Section --- */}
      <section className={styles.section}>
        <div className={`${styles.galleryContainer} container`}>
          <h2 className="textHeader">Gallery</h2>
          <div className={styles.galleryWrapper}>
            {images.map((image, index) => (
              <figure key={index} onClick={() => openModal(index)}>
                <picture>
                  <Image
                    src={image}
                    alt={`Our Clinic Gallery Image ${index + 1}`}
                    width={700}
                    height={700}
                  />
                </picture>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {selectedImageIndex !== null && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          images={images}
          initialIndex={selectedImageIndex}
        />
      )}

      <ContactSection/>
    </RootLayout>
  );
};

export default Aboutus;
