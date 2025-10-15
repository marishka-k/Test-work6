import { useState } from 'react'
import styles from './inputCode.module.css';

const InputCode = ({index, handleChange, handleKeyDown, digit, showError, inputRef}) => {
  const [isFocused, setIsFocused] = useState(false);  

  return (
    <li className={showError ? `${styles.container} ${styles.error} ${isFocused ? styles.focused : ''}` : `${styles.container} ${isFocused ? styles.focused : ''}`}> 
      <input        
        ref={inputRef}
        id={`code-${index}`}
        type="text"
        value={digit}
        onChange={(e) => handleChange(index, e)}
        onKeyDown={(e) => handleKeyDown(index, e)}
        className={styles.input}
        maxLength={1}
        autoFocus={index === 0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </li>
  );
};

export default InputCode;