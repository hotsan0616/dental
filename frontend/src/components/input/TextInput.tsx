import React from 'react';
import styles from './TextInput.module.css';

export interface TextInputProps {
  type: string;
  name?: string;
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ 
  type, 
  name,
  id,
  value, 
  onChange, 
  label, 
  error,
  placeholder 
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        name={name || id}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.error : ''}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default TextInput;
