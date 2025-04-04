import React from 'react';
import styles from './TextInput.module.css';

interface TextInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  pattern?: string;
  id?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  id,
  onChange,
  type = 'text',
  pattern,
}) => {
  return (
    <div className={styles.main}>
      <input
        type={type}
        name={id}
        id={id}
        placeholder=""
        value={value}
        onChange={onChange}
        pattern={pattern}
        required
      />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  );
};

export default TextInput;
