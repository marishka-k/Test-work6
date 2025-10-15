import { useState } from 'react'
import styles from './inputConteiner.module.css';

const InputConteiner = ({icon, placeholder, text, onChange, type, isPending, showError}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <li className={showError ? `${styles.container} ${styles.error} ${isFocused ? styles.focused : ''}` : `${styles.container} ${isFocused ? styles.focused : ''}`}>      
      <img src={icon} alt={placeholder} className={styles.logo}/>
      <input
        type={type}
        placeholder={placeholder}
        value={text}
        onChange={onChange}
        className={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isPending}
      />
    </li>
  );
};

export default InputConteiner;