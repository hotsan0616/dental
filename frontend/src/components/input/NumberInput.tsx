import React from "react";
import styles from "./PhoneNumberInput.module.css";

interface PhoneNumberInputProps {
  placeholder: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  required?: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  placeholder,
  value,
  id,
  onChange,
  required = false,
}) => {
  return (
    <div className={styles.main}>
      <input
        type="number"
        name={id}
        id={id}
        placeholder=""
        value={value}
        onChange={onChange}
        required={required}
        pattern="^(5[0-9]{9})$"
        title="Örn: 535 XXX XX XX"
      />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
};

export default PhoneNumberInput;
