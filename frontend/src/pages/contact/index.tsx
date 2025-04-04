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
import { submitContactForm } from '../../utils/api';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    emailAddress: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm(formState);
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
        emailAddress: "",
        topic: "",
        message: "",
      });

      router.push("/");
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        html: '<p class="custom-swal-text">Failed to submit your request. Please try again later.</p>',
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          title: "custom-swal-title",
          confirmButton: "custom-swal-confirm-button",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
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
                id="firstName"
                placeholder="First Name"
                value={formState.firstName}
                onChange={handleInputChange}
              />
              <TextInput
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={formState.lastName}
                onChange={handleInputChange}
              />
              <TextInput
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                value={formState.phone}
                onChange={handleInputChange}
              />
              <TextInput
                type="email"
                name="emailAddress"
                id="emailAddress"
                placeholder="Email Address"
                value={formState.emailAddress}
                onChange={handleInputChange}
              />
              <div className={styles.selectContainer}>
                <span>Topic</span>
                <select
                  id="topic"
                  value={formState.topic}
                  onChange={handleInputChange}
                >
                  <option value="">Select a topic</option>
                  <option value="Appointment">Appointment</option>
                  <option value="Price Inquiry">Price Inquiry</option>
                  <option value="General Question">General Question</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>
              <div className={styles.selectContainer}>
                <span>Message</span>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="Your message"
                  className={styles.textarea}
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
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
