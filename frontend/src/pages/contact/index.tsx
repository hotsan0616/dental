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
      title: "Success!",
      html: '<p class="custom-swal-text">Your request has been successfully submitted.</p>',
      icon: "success",
      confirmButtonText: "OK",
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
        <h2 className={styles.contactHeroTextHeader}>Contact Us</h2>
        <p className={styles.contactHeroSubTextHeader}>
          We're here to provide you with the best service. Don't hesitate to contact us
          for appointments or any questions you may have.
        </p>
      </section>
      <section className={styles.section}>
        <div className={`${styles.main} container`}>
          <h4 className="textHeader">Contact Form</h4>
          <div className={styles.wrapper}>
            <form onSubmit={handleSubmit}>
              <TextInput
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formState.firstName}
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formState.lastName}
                onChange={handleInputChange}
              />
              <TextInput
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formState.phone}
                onChange={handleInputChange}
              />
              <TextInput
                type="email"
                name="email"
                placeholder="Email Address"
                value={formState.email}
                onChange={handleInputChange}
              />
              <label htmlFor="topic" className={styles.selectContainer}>
                <span>Topic</span>
                <select
                  name="topic"
                  id="topic"
                  value={formState.topic}
                  onChange={handleInputChange}
                >
                  <option value="Price">Price Inquiry</option>
                  <option value="Treatment">Post-Treatment Consultation</option>
                  <option value="Complaint">File a Complaint</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <button type="submit">
                Submit
              </button>
            </form>
            <div className={styles.mapWrapper}>
              <MapComponent address="2/F, Yan Oi Polyclinic, 6 Tuen Lee Street, Tuen Mun" />
            </div>
          </div>
        </div>
      </section>

      <Divider text="Contact Information" />

      <section className={styles.section}>
        <div className={`${styles.clinicInfoContainer} container`}>
          <div className={styles.workhoursWrapper}>
            <article>
              <h2 className={styles.contactInfoTextHeader}>Office Hours</h2>
              <table className={styles.workhoursTable}>
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>09:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>09:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>09:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>09:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>09:00 - 18:00</td>
                  </tr>
                  <tr>
                    <td>Saturday</td>
                    <td>10:00 - 16:00</td>
                  </tr>
                  <tr>
                    <td>Sunday</td>
                    <td>Closed</td>
                  </tr>
                </tbody>
              </table>
            </article>
          </div>
          <div className={styles.contactInfoWrapper}>
            <div className={styles.addressWrapper}>
              <h2 className={styles.contactInfoTextHeader}>Contact Details</h2>
              <div>
                <GoLocation />
                Address: 2/F, Yan Oi Polyclinic, 6 Tuen Lee Street, Tuen Mun
              </div>
              <div>
                <Link href="tel:+85224523261">
                  <CiPhone />
                  Phone: +852 2452 3261
                </Link>
              </div>
            </div>

            <div className={styles.socialWrapper}>
              <h2 className={styles.contactInfoTextHeader}>
                Connect With Us
              </h2>
              <Link href="https://wa.me/85224523261">
                <AiOutlineWhatsApp />
                +852 2452 3261
              </Link>
              <Link href="https://instagram.com/hkdentalcare">
                <FaInstagram />
                @hkdentalcare
              </Link>
              <Link href="https://youtube.com/hkdentalcare">
                <CiYoutube />
                @hkdentalcare
              </Link>
              <Link href="mailto:contact@hkdentalcare.com">
                <CiMail />
                contact@hkdentalcare.com
              </Link>
            </div>
          </div>
        </div>
      </section>
    </RootLayout>
  );
};

export default Contact;
