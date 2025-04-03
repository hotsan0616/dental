import React, { useState, useEffect } from "react";
import RootLayout from "@/layouts/RootLayout";
import { patientApi } from "@/utils/api";
import { GoLocation } from "react-icons/go";
import { CiPhone } from "react-icons/ci";
import { FaClock } from "react-icons/fa";
import Link from "next/link";
import styles from "./Clinic.module.css";

interface Clinic {
  id: number;
  name: string;
  address: string;
  district: string;
  phone: string;
  openHours: string;
}

const ClinicListing: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await patientApi.getClinics();
        if (response.code === 0) {
          setClinics(response.clinicList);
        } else {
          setError(response.message || "Failed to fetch clinics");
        }
      } catch (err) {
        setError("Failed to fetch clinics");
        console.error("Error fetching clinics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  if (loading) {
    return (
      <RootLayout>
        <div className={styles.loading}>Loading clinics...</div>
      </RootLayout>
    );
  }

  if (error) {
    return (
      <RootLayout>
        <div className={styles.error}>{error}</div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <section className={styles.clinicListing}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Our Clinics</h1>
            <p>Find a clinic near you and schedule your appointment today</p>
          </div>

          <div className={styles.clinicGrid}>
            {clinics.map((clinic) => (
              <div key={clinic.id} className={styles.clinicCard}>
                <div className={styles.clinicInfo}>
                  <h2>{clinic.name}</h2>
                  <div className={styles.details}>
                    <div className={styles.detail}>
                      <GoLocation className={styles.icon} />
                      <div>
                        <span className={styles.label}>Address</span>
                        <p>{clinic.address}</p>
                      </div>
                    </div>
                    <div className={styles.detail}>
                      <CiPhone className={styles.icon} />
                      <div>
                        <span className={styles.label}>Phone</span>
                        <p>{clinic.phone}</p>
                      </div>
                    </div>
                    <div className={styles.detail}>
                      <FaClock className={styles.icon} />
                      <div>
                        <span className={styles.label}>Opening Hours</span>
                        <p>{clinic.openHours}</p>
                      </div>
                    </div>
                  </div>
                  <Link href={`/clinic/${clinic.id}`} className={styles.viewButton}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RootLayout>
  );
};

export default ClinicListing;
