import React, { useEffect, useState } from 'react';
import RootLayout from '@/layouts/RootLayout';
import styles from './Profile.module.css';
import { useRouter } from 'next/router';
import { FaUser, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaSignOutAlt, FaEdit, FaSave } from "react-icons/fa";
import { patientApi } from '@/utils/api';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  gender: string;
  dob: string;
  phone: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  treatment: string;
  status: "completed" | "upcoming" | "cancelled";
}

interface ValidationErrors {
  [key: string]: string;
}

const Profile: React.FC = () => {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Mock data for appointments - replace with actual data from your backend
  const appointments: Appointment[] = [
    {
      id: "1",
      date: "2024-03-15",
      time: "10:00 AM",
      treatment: "Dental Cleaning",
      status: "completed",
    },
    {
      id: "2",
      date: "2024-03-20",
      time: "2:30 PM",
      treatment: "Teeth Whitening",
      status: "upcoming",
    },
    {
      id: "3",
      date: "2024-02-28",
      time: "11:00 AM",
      treatment: "Dental Check-up",
      status: "cancelled",
    },
  ];

  useEffect(() => {
    // Check if user is logged in
    const jwtToken = sessionStorage.getItem('jwtToken');
    const patientInfo = sessionStorage.getItem('patientInfo');

    if (!jwtToken || !patientInfo) {
      router.push('/login');
      return;
    }

    // Parse and set patient information
    const parsedPatient = JSON.parse(patientInfo);
    setPatient(parsedPatient);
    setEditedPatient(parsedPatient);
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPatient(patient);
    setError(null);
  };

  const handleSave = async () => {
    if (!editedPatient) return;

    try {
      const response = await patientApi.editProfile(editedPatient);
      if (response.code === 0) {
        setPatient(editedPatient);
        sessionStorage.setItem('patientInfo', JSON.stringify(editedPatient));
        setIsEditing(false);
        setError(null);
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error updating profile:', err);
    }
  };

  const handleInputChange = (field: keyof Patient, value: string) => {
    if (!editedPatient) return;
    setEditedPatient({ ...editedPatient, [field]: value });
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('patientInfo');
    // Redirect to login page
    router.push('/login');
  };

  const getStatusIcon = (status: Appointment["status"]) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className={styles.statusIcon} />;
      case "cancelled":
        return <FaTimesCircle className={styles.statusIcon} />;
      default:
        return <FaClock className={styles.statusIcon} />;
    }
  };

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "completed":
        return styles.statusCompleted;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return styles.statusUpcoming;
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <RootLayout>
      <div className={styles.profileContainer}>
        {/* Basic Information Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <FaUser className={styles.sectionIcon} />
              <h2>Basic Information</h2>
            </div>
            {!isEditing ? (
              <button onClick={handleEdit} className={styles.editButton}>
                <FaEdit /> Edit
              </button>
            ) : (
              <div className={styles.editActions}>
                <button onClick={handleSave} className={styles.saveButton}>
                  <FaSave /> Save
                </button>
                <button onClick={handleCancel} className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            )}
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedPatient?.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={styles.input}
                />
              ) : (
                <p>{patient?.firstName}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedPatient?.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={styles.input}
                />
              ) : (
                <p>{patient?.lastName}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedPatient?.emailAddress || ''}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  className={styles.input}
                />
              ) : (
                <p>{patient?.emailAddress}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedPatient?.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={styles.input}
                />
              ) : (
                <p>{patient?.phone}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>Gender</label>
              {isEditing ? (
                <select
                  value={editedPatient?.gender || ''}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={styles.input}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              ) : (
                <p>{patient?.gender === 'M' ? 'Male' : 'Female'}</p>
              )}
            </div>
            <div className={styles.infoItem}>
              <label>Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedPatient?.dob.split('T')[0] || ''}
                  onChange={(e) => handleInputChange('dob', e.target.value + 'T00:00:00')}
                  className={styles.input}
                />
              ) : (
                <p>{new Date(patient?.dob || '').toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </section>

        {/* Appointment History Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaCalendarAlt className={styles.sectionIcon} />
            <h2>Appointment History</h2>
          </div>
          <div className={styles.appointmentList}>
            {appointments.map((appointment) => (
              <div key={appointment.id} className={styles.appointmentCard}>
                <div className={styles.appointmentInfo}>
                  <h3>{appointment.treatment}</h3>
                  <p>
                    {appointment.date} at {appointment.time}
                  </p>
                </div>
                <div className={`${styles.statusBadge} ${getStatusColor(appointment.status)}`}>
                  {getStatusIcon(appointment.status)}
                  <span>{appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Logout Button */}
        <div className={styles.logoutContainer}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <FaSignOutAlt className={styles.logoutIcon} />
            Logout
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default Profile; 