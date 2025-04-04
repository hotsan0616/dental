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
    ClinicPhotoFour,
    ClinicPhotoFive,
    ClinicPhotoSix,
    ClinicPhotoSeven,
    ClinicPhotoEight,
    ClinicPhotoNine,
  ]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
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
        <h2>LoremDentalKlinik</h2>
        <p>
          Sizlere en iyi hizmeti sunmak için buradayız. Randevu almak veya
          sorularınız için bizimle iletiş ime geçmekten çekinmeyin
        </p>
      </section>

      {/* --- About us Section --- */}
      <section>
        <div className={`${styles.aboutUsContainer} container`}>
          <h2 className={`${styles.titleMobile} textHeader`}>Hakkımızda</h2>
          <div className={styles.aboutUsWrapper}>
            <article>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci corrupti obcaecati veritatis assumenda, quas laudantium
                quis cum deleniti ipsam, eligendi aliquam quidem totam, cumque
                quo ipsum nihil repellat reprehenderit aliquid.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci corrupti obcaecati veritatis assumenda, quas laudantium
                quis cum deleniti ipsam, eligendi aliquam quidem totam, cumque
                quo ipsum nihil repellat reprehenderit aliquid.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci corrupti obcaecati veritatis assumenda, quas laudantium
                quis cum deleniti ipsam, eligendi aliquam quidem totam, cumque
                quo ipsum nihil repellat reprehenderit aliquid.
              </p>
              <h4 className={styles.articleSubHeader}>Another Header</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci corrupti obcaecati veritatis assumenda, quas laudantium
                quis cum deleniti ipsam, eligendi aliquam quidem totam, cumque
                quo ipsum nihil repellat reprehenderit aliquid.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci corrupti obcaecati veritatis assumenda, quas laudantium
                quis cum deleniti ipsam, eligendi aliquam quidem totam, cumque
                quo ipsum nihil repellat reprehenderit aliquid.
              </p>
            </article>
            <figure>
              <picture>
                <Image
                  src={aboutUsImage}
                  alt="Lorem Dental Klinik"
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
          <h2 className="textHeader">Sağlıklı Gülüşlerin Adresi</h2>
          <CountUp clients={1000} experience={15} team={50} />
        </div>
      </section>

      {/* --- Gallery Section --- */}
      <section className={styles.section}>
        <div className={`${styles.galleryContainer} container`}>
          <h2 className="textHeader">Galeri</h2>
          <div className={styles.galleryWrapper}>
            {images.map((image, index) => (
              <figure key={index} onClick={() => openModal(index)}>
                <picture>
                  <Image
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    width={700}
                    height={700}
                  />
                </picture>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section>
        <div className={`${styles.teamContainer} container`}>
          <h2 className="textHeader">Ekibimiz</h2>
          <article className={styles.teamWrapper}>
            {team.map((member, index) => (
              <TeamCard
              slug={member.slug}
                key={index}
                photoUrl={member.photoUrl}
                name={member.name}
                title={member.title}
                resumeUrl={member.resumeUrl}
              />
            ))}
          </article>
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
