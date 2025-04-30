import React, { useState } from "react";
import RootLayout from "@/layouts/RootLayout";
import styles from "./ForgotPassword.module.css";
import TextInput from "@/components/input/TextInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { patientApi } from "@/utils/api";
import SuccessPopup from "@/components/popup/SuccessPopup";

interface ForgotPasswordFormData {
  email: string;
}

interface FormErrors {
  email?: string;
  submit?: string;
}

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
      const response = await patientApi.forgotPassword({
        email: formData.email,
      });

      if (response.code === 0) {
        setShowSuccessPopup(true);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setErrors({
          submit: response.message || "Failed to send reset link. Please try again."
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
      <section className={styles.forgotPasswordSection}>
        <div className="container">
          <div className={styles.forgotPasswordContainer}>
            <h1 className={styles.forgotPasswordTitle}>Forgot Password</h1>
            <p className={styles.forgotPasswordSubtitle}>
              Enter your email to receive a password reset link
            </p>

            <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
              <div className={styles.inputWrapper}>
                <TextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </div>

              <button 
                type="submit" 
                className={`${styles.submitButton} ${isSubmitting ? styles.loading : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>

              {errors.submit && (
                <span className={styles.errorMessage}>{errors.submit}</span>
              )}

              <div className={styles.backToLoginLink}>
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
          message="Reset link sent successfully! Check your email."
          onClose={() => setShowSuccessPopup(false)}
        />
      )}
    </RootLayout>
  );
};

export default ForgotPassword;