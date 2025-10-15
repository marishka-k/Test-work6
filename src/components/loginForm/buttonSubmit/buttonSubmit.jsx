import { useMemo } from 'react';
import styles from './buttonSubmit.module.css'


export const ButtonSubmit = ({isPending, isFormValid, showError, name}) => {
  const isActive = useMemo(() => {
    let _isActive = false
    isFormValid && !showError && !isPending ? _isActive = true : _isActive = false
    return _isActive
  }, [isPending, isFormValid, showError])

  return (
    <button type="submit" disabled={!isActive} className={isActive ? styles.button : `${styles.button} ${styles.button_disabled}`} >
      {name}
    </button>    
  );
};