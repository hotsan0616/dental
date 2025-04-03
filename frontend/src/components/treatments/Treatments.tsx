import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Treatments.module.css';
import { patientApi } from '@/utils/api';

interface Treatment {
  id: number;
  name: string;
  image_url: string;
}

const Treatments: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await patientApi.getTreatments();
        if (response.code === 0) {
          setTreatments(response.itemList);
        } else {
          setError(response.message || 'Failed to fetch treatments');
        }
      } catch (err) {
        setError('Failed to fetch treatments');
        console.error('Error fetching treatments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  if (loading) {
    return (
      <section>
        <div className="container">
          <h2 className="textHeader">Our Treatments</h2>
          <h4 className="textSubheader" style={{marginBottom:"12px"}}>
            You can contact us to get detailed information about oral and dental health treatments.
          </h4>
          <div className={styles.treatmentsContainer}>
            {[1, 2, 3, 4].map((i) => (
              <article key={i}>
                <figure className={styles.imageWrapper}>
                  <Image
                    src="/images/treatments/placeholder.jpg"
                    alt="Loading..."
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </figure>
                <span>Loading...</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="container">
          <h2 className="textHeader">Our Treatments</h2>
          <h4 className="textSubheader" style={{marginBottom:"12px"}}>
            You can contact us to get detailed information about oral and dental health treatments.
          </h4>
          <div className={styles.error}>{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <h2 className="textHeader">Our Treatments</h2>
        <h4 className="textSubheader" style={{marginBottom:"12px"}}>
          You can contact us to get detailed information about oral and dental health treatments.
        </h4>
        <div className={styles.treatmentsContainer}>
          {treatments.map((treatment) => (
            <article key={treatment.id}>
              <figure className={styles.imageWrapper}>
                <Image
                  src={treatment.image_url}
                  alt={`${treatment.name} Image`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </figure>
              <span>{treatment.name}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Treatments; 