import React, { useState, useEffect } from "react";
import RootLayout from "@/layouts/RootLayout";
import styles from "./ResetPassword.module.css";
import TextInput from "@/components/input/TextInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { patientApi } from "@/utils/api";
import SuccessPopup from "@/components/popup/SuccessPopup";

interface ResetPasswordFormData {
  email: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
  submit?: string;
}

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    // Get email and code from URL parameters
    const { email, code } = router.query;
    if (email && code) {
      setFormData(prev => ({
        ...prev,
        email: email as string,
        code: code as string,
      }));
    }
  }, [router.query]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await patientApi.resetPassword({
        email: formData.email,
        code: formData.code,
        newPassword: formData.newPassword,
      });

      if (response.code === 0) {
        setShowSuccessPopup(true);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setErrors({
          submit: response.message || "Failed to reset password. Please try again."
        });
      }
    } catch (error) {
      setErrors({
        submit: "An error occurred. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RootLayout>
      <section className={styles.resetPasswordSection}>
        <div className="container">
          <div className={styles.resetPasswordContainer}>
            <h1 className={styles.resetPasswordTitle}>Reset Password</h1>
            <p className={styles.resetPasswordSubtitle}>
              Please enter your new password
            </p>

            <form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
              <div className={styles.inputWrapper}>
                <TextInput
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  error={errors.newPassword}
                />
              </div>

              <div className={styles.inputWrapper}>
                <TextInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                />
              </div>

              <button 
                type="submit" 
                className={`${styles.submitButton} ${isSubmitting ? styles.loading : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Resetting...' : 'Reset Password'}
              </button>

              {errors.submit && (
                <span className={styles.errorMessage}>{errors.submit}</span>
              )}

              <div className={styles.loginLink}>
                <p>
                  Remember your password?{" "}
                  <Link href="/login">Login here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {showSuccessPopup && (
        <SuccessPopup
          message="Password reset successful! Redirecting to login..."
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </RootLayout>
  );
};

export default ResetPassword;