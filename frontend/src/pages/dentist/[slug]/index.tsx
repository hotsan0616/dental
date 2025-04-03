import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import RootLayout from '@/layouts/RootLayout';
import { patientApi } from '@/utils/api';
import styles from './Dentist.module.css';

interface Dentist {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  emailAddress: string;
  imageUrl?: string;
}

interface DentistItem {
  id: number;
  dentistReferenceId: number;
  item: {
    id: number;
    name: string;
  };
  fee: number;
}

interface ClinicSchedule {
  id: number;
  clinicReferenceId: number;
  clinic: {
    id: number;
    name: string;
    address: string;
    district: string;
    phone: string;
    openHours: string;
  };
  dayOfWeek: string;
  timeslot: {
    id: number;
    startTime: string;
    endTime: string;
  };
}

const DentistDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [dentist, setDentist] = useState<Dentist | null>(null);
  const [treatments, setTreatments] = useState<DentistItem[]>([]);
  const [clinicSchedules, setClinicSchedules] = useState<ClinicSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;

      try {
        const id = parseInt(slug.toString().replace('dentist-', ''));
        if (isNaN(id)) {
          setError('Invalid dentist ID');
          setLoading(false);
          return;
        }

        const [dentistResponse, treatmentsResponse, clinicResponse] = await Promise.all([
          patientApi.getDentistById(id),
          patientApi.getDentistItems(id),
          patientApi.getClinicDentistsByDentist(id)
        ]);

        if (dentistResponse.code === 0 && treatmentsResponse.code === 0 && clinicResponse.code === 0) {
          setDentist(dentistResponse.dentist);
          setTreatments(treatmentsResponse.dentistItemList);
          setClinicSchedules(clinicResponse.clinicDentistList);
        } else {
          setError(dentistResponse.message || treatmentsResponse.message || clinicResponse.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const groupByClinic = (schedules: ClinicSchedule[]) => {
    const grouped = schedules.reduce((acc, schedule) => {
      const clinicId = schedule.clinic.id;
      if (!acc[clinicId]) {
        acc[clinicId] = {
          clinic: schedule.clinic,
          schedules: []
        };
      }
      acc[clinicId].schedules.push({
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.timeslot.startTime,
        endTime: schedule.timeslot.endTime
      });
      return acc;
    }, {} as Record<number, { clinic: ClinicSchedule['clinic']; schedules: Array<{ dayOfWeek: string; startTime: string; endTime: string }> }>);

    return Object.values(grouped);
  };

  if (loading) {
    return (
      <RootLayout>
        <div className={styles.container}>
          <div className={styles.loading}>Loading...</div>
        </div>
      </RootLayout>
    );
  }

  if (error || !dentist) {
    return (
      <RootLayout>
        <div className={styles.container}>
          <div className={styles.error}>{error || 'Dentist not found'}</div>
        </div>
      </RootLayout>
    );
  }

  const groupedSchedules = groupByClinic(clinicSchedules);

  return (
    <RootLayout>
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.imageContainer}>
            <Image
              src={dentist.imageUrl || '/images/default-avatar.png'}
              alt={`${dentist.firstName} ${dentist.lastName}`}
              width={200}
              height={200}
              className={styles.avatar}
            />
          </div>
          <div className={styles.info}>
            <h1>{`${dentist.gender === 'M' ? 'Dr.' : 'Dr.'} ${dentist.firstName} ${dentist.lastName}`}</h1>
            <div className={styles.details}>
              <div className={styles.detail}>
                <label>Email:</label>
                <p>{dentist.emailAddress}</p>
              </div>
              <div className={styles.detail}>
                <label>Gender:</label>
                <p>{dentist.gender === 'M' ? 'Male' : 'Female'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.clinics}>
          <h2>Available at Clinics</h2>
          <div className={styles.clinicList}>
            {groupedSchedules.map(({ clinic, schedules }) => (
              <div key={clinic.id} className={styles.clinicCard}>
                <div className={styles.clinicInfo}>
                  <h3>{clinic.name}</h3>
                  <p className={styles.address}>{clinic.address}</p>
                  <p className={styles.district}>District: {clinic.district}</p>
                  <p className={styles.phone}>Phone: {clinic.phone}</p>
                  <p className={styles.hours}>Opening Hours: {clinic.openHours}</p>
                </div>
                <div className={styles.scheduleInfo}>
                  <h4>Available Times:</h4>
                  <div className={styles.schedules}>
                    {schedules.map((schedule, index) => (
                      <div key={index} className={styles.schedule}>
                        <span className={styles.day}>{schedule.dayOfWeek}</span>
                        <span className={styles.time}>
                          {schedule.startTime.substring(0, 5)} - {schedule.endTime.substring(0, 5)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.treatments}>
          <h2>Available Treatments</h2>
          <div className={styles.treatmentList}>
            {treatments.map((treatment) => (
              <div key={treatment.id} className={styles.treatmentCard}>
                <div className={styles.treatmentInfo}>
                  <h3>{treatment.item.name}</h3>
                  <p className={styles.fee}>
                    Fee: ${treatment.fee.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default DentistDetail;
