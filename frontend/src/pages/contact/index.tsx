import React, { useState } from "react";
import Swal from "sweetalert2";
import { GoLocation } from "react-icons/go";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa6";
import { CiYoutube, CiMail, CiPhone } from "react-icons/ci";
import RootLayout from "@/layouts/RootLayout";
import Link from "next/link";
import TextInput from "@/components/input/TextInput";
import MapComponent from "@/components/map/MapComponent";
import Divider from "@/components/divider/Divider";
import { useRouter } from "next/router";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    topic: "",
  });

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await Swal.fire({
      title: "Başarılı!",
      html: '<p class="custom-swal-text">Talebiniz başarıyla iletildi.</p>',
      icon: "success",
      confirmButtonText: "Onayla",
      customClass: {
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
      },
    });

    setFormState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      topic: "",
    });

    router.push("/");
  };

  return (
    <RootLayout>
      <section className={`${styles.contactHero} container-fluid`}>
        <h2 className={styles.contactHeroTextHeader}>İletişim</h2>
        <p className={styles.contactHeroSubTextHeader}>
          Sizlere en iyi hizmeti sunmak için buradayız. Randevu almak veya
          sorularınız için bizimle iletişime geçmekten çekinmeyin
        </p>
      </section>
      <section className={styles.section}>
        <div className={`${styles.main} container`}>
          <h4 className="textHeader">İletişim Formu</h4>
          <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
              <TextInput
                type="text"
                placeholder="Adınız"
                value={formState.firstName}
                onChange={handleInputChange}
                id="firstName"
              />
              <TextInput
                type="text"
                placeholder="Soyadınız"
                value={formState.lastName}
                onChange={handleInputChange}
                id="lastName"
              />
              <TextInput
                type="tel"
                placeholder="Telefon Numaranız"
                value={formState.phone}
                onChange={handleInputChange}
                id="phone"
              />
              <TextInput
                type="email"
                placeholder="E-posta adresiniz"
                value={formState.email}
                onChange={handleInputChange}
                id="email"
              />
              <label htmlFor="selectTopic" className={styles.selectContainer}>
                <span>Konu</span>
                <select
                  name="topic"
                  id="topic"
                  value={formState.topic}
                  onChange={handleInputChange}
                >
                  <option value="Fiyat">Fiyat Bilgisi Öğrenme</option>
                  <option value="Tedavi">Tedavi Sonrası Danışma</option>
                  <option value="Şikayet">Şikayet Talebi</option>
                  <option value="KonuDışı">Konu Dışı</option>
                </select>
              </label>
              <button type="submit" onClick={handleSubmit}>
                Gönder
              </button>
            </form>
            <div className={styles.mapWrapper}>
              <MapComponent />
            </div>
          </div>
        </div>
      </section>

      <Divider text="Lorem" />

      <section className={styles.section}>
        <div className={`${styles.clinicInfoContainer} container`}>
          <div className={styles.workhoursWrapper}>
            <article>
              <h2 className={styles.contactInfoTextHeader}>Ofis Saatleri</h2>
              <table className={styles.workhoursTable}>
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
          </div>
          <div className={styles.contactInfoWrapper}>
            <div className={styles.addressWrapper}>
              <h2 className={styles.contactInfoTextHeader}>İrtibat</h2>
              <div>
                <GoLocation />
                Adres: Apt. 929 13356 Desmond Court, West Todd, AR 03263
              </div>
              <div>
                <Link href="tel:+15053742847">
                  <CiPhone />
                  Telefon: +1 (505) 111-111
                </Link>
              </div>
            </div>

            <div className={styles.socialWrapper}>
              <h2 className={styles.contactInfoTextHeader}>
                Sosyal Bağlantılar
              </h2>
              <Link href="https://wa.me/15053742847">
                <AiOutlineWhatsApp />
                +1 (505) 374-2847
              </Link>
              <Link href="https://instagram.com/loremdentaclinic">
                <FaInstagram />
                @loremdentaclinic
              </Link>
              <Link href="https://youtube.com/loremdentaclinic">
                <CiYoutube />
                @loremdentaclinic
              </Link>
              <Link href="mailto:contact@loremdentaclinic.com">
                <CiMail />
                contact@loremdentaclinic.com
              </Link>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
};

export default Contact;
