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
  id: number;
  patientId: number;
  clinicDentistId: number;
  appointmentDate: string;
  totalAmount: string;
  status: string;
  createdAt: string;
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

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentError, setAppointmentError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State for confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);

  // State for success popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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

    // Fetch patient appointments
    const fetchAppointments = async () => {
      try {
        const response = await patientApi.getPatientAppointments(parsedPatient.id);
        if (response.code === 0) {
          setAppointments(response.appointments);
        } else {
          setAppointmentError(response.message || 'Failed to fetch appointments');
        }
      } catch (err) {
        setAppointmentError('Failed to fetch appointments');
        console.error('Error fetching appointments:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
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

  const handleCancelAppointment = async (appointmentId: number) => {
    setAppointmentToCancel(appointmentId);
    setShowConfirmModal(true);
  };

  const confirmCancellation = async () => {
    if (appointmentToCancel === null) return;

    try {
      const response = await patientApi.cancelAppointment(appointmentToCancel);
      if (response.code === 0) {
        // Update appointments list after cancellation
        setAppointments(appointments.map(apt => 
          apt.id === appointmentToCancel ? { ...apt, status: 'CANCELLED' } : apt
        ));
        // Show success popup
        setShowConfirmModal(false);
        setShowSuccessPopup(true);
      } else {
        setAppointmentError(response.message || 'Failed to cancel appointment');
        setShowConfirmModal(false);
      }
    } catch (err) {
      setAppointmentError('Failed to cancel appointment');
      console.error('Error cancelling appointment:', err);
      setShowConfirmModal(false);
    } finally {
      setAppointmentToCancel(null);
    }
  };

  const cancelModal = () => {
    setShowConfirmModal(false);
    setAppointmentToCancel(null);
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    // Refresh the page
    window.location.reload();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <FaCheckCircle className={styles.statusIcon} />;
      case "CANCELLED":
        return <FaTimesCircle className={styles.statusIcon} />;
      default:
        return <FaClock className={styles.statusIcon} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return styles.statusCompleted;
      case "CANCELLED":
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
          {appointmentError && <div className={styles.error}>{appointmentError}</div>}
          {isLoading ? (
            <div className={styles.loading}>Loading appointments...</div>
          ) : (
            <div className={styles.appointmentList}>
              {appointments.map((appointment) => (
                <div key={appointment.id} className={styles.appointmentCard}>
                  {appointment.status === 'PENDING' && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className={styles.cancelIconButton}
                    >
                      <FaTimesCircle />
                    </button>
                  )}
                  <div className={styles.appointmentInfo}>
                    <h3>Appointment #{appointment.id}</h3>
                    <p>{new Date(appointment.appointmentDate).toLocaleString()}</p>
                    <p className={styles.amount}>Amount: ${appointment.totalAmount}</p>
                  </div>
                  <div className={styles.appointmentActions}>
                    <div className={`${styles.statusBadge} ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      <span>{appointment.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Confirm Cancellation</h3>
              <p>Are you sure you want to cancel this appointment?</p>
              <div className={styles.modalActions}>
                <button onClick={confirmCancellation} className={styles.confirmButton}>
                  Confirm
                </button>
                <button onClick={cancelModal} className={styles.cancelModalButton}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Success</h3>
              <p>Appointment has been successfully cancelled.</p>
              <div className={styles.modalActions}>
                <button onClick={handleSuccessPopupClose} className={styles.successButton}>
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

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