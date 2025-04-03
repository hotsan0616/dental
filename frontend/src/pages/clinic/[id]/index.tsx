import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import RootLayout from '@/layouts/RootLayout';
import { patientApi } from '@/utils/api';
import MapComponent from '@/components/map/MapComponent';
import styles from './Clinic.module.css';

interface ClinicDentist {
  id: number;
  clinic: {
    id: number;
    name: string;
    address: string;
    district: string;
    phone: string;
    openHours: string;
  };
  dentist: {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    emailAddress: string;
    imageUrl: string;
  };
  dayOfWeek: string;
  timeslot: {
    startTime: string;
    endTime: string;
  };
}

const DAYS_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ClinicDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [clinicDentists, setClinicDentists] = useState<ClinicDentist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  useEffect(() => {
    const fetchClinicData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await patientApi.getClinicDentists(id as string);
        if (response.clinicDentistList.length > 0) {
          setClinicDentists(response.clinicDentistList);
          // Set the first available day as expanded by default
          const firstDay = response.clinicDentistList[0].dayOfWeek;
          setExpandedDay(firstDay);
        }
      } catch (err) {
        setError('Failed to fetch clinic data');
      } finally {
        setLoading(false);
      }
    };

    fetchClinicData();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (clinicDentists.length === 0) {
    return <div className={styles.error}>No clinic data found</div>;
  }

  const clinic = clinicDentists[0].clinic;
  const scheduleByDay = clinicDentists.reduce((acc, curr) => {
    if (!acc[curr.dayOfWeek]) {
      acc[curr.dayOfWeek] = [];
    }
    acc[curr.dayOfWeek].push(curr);
    return acc;
  }, {} as Record<string, ClinicDentist[]>);

  // Sort days according to DAYS_ORDER
  const sortedDays = Object.keys(scheduleByDay).sort(
    (a, b) => DAYS_ORDER.indexOf(a) - DAYS_ORDER.indexOf(b)
  );

  const toggleDay = (day: string) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <RootLayout>
      <div className={styles.container}>
        <div className={styles.clinicInfo}>
          <h1>{clinic.name}</h1>
          <div className={styles.details}>
            <p><strong>Address:</strong> {clinic.address}</p>
            <p><strong>District:</strong> {clinic.district}</p>
            <p><strong>Phone:</strong> {clinic.phone}</p>
            <p><strong>Opening Hours:</strong> {clinic.openHours}</p>
          </div>
        </div>

        <div className={styles.mapContainer}>
          <MapComponent address={clinic.address} />
        </div>

        <div className={styles.schedule}>
          <h2>Weekly Schedule</h2>
          {sortedDays.map((day) => (
            <div key={day} className={styles.daySchedule}>
              <button 
                className={styles.dayHeader}
                onClick={() => toggleDay(day)}
                aria-expanded={expandedDay === day}
              >
                <h3>{day}</h3>
                <span className={styles.arrow}>
                  {expandedDay === day ? '▼' : '▶'}
                </span>
              </button>
              {expandedDay === day && (
                <div className={styles.dentistList}>
                  {scheduleByDay[day].map((schedule) => (
                    <Link
                      key={schedule.id}
                      href={`/dentist/dentist-${schedule.dentist.id}`}
                      className={styles.dentistCard}
                    >
                      <Image
                        src={schedule.dentist.imageUrl || '/images/default-avatar.png'}
                        alt={`${schedule.dentist.firstName} ${schedule.dentist.lastName}`}
                        width={60}
                        height={60}
                        className={styles.dentistImage}
                      />
                      <div className={styles.dentistInfo}>
                        <h4>{schedule.dentist.firstName} {schedule.dentist.lastName}</h4>
                        <p>{schedule.timeslot.startTime.substring(0, 5)} - {schedule.timeslot.endTime.substring(0, 5)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default ClinicDetail; 