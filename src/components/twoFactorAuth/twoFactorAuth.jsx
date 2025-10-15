import { useEffect, useRef, useState } from 'react';
import { useVerifyCode } from '../../hooks/useVerifyCode';
import logo from '../../images/logo.svg'
import back from '../../images/back.svg'
import styles from './twoFactorAuth.module.css'
import InputCode from './inputCode/inputCode';
import { ButtonSubmit } from '../loginForm/buttonSubmit/buttonSubmit';

export const TwoFactorAuth = ({ onVerify, onBack }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const { mutate, isPending } = useVerifyCode();
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60); // Таймер: 60 секунд
  const [isTimerActive, setIsTimerActive] = useState(true); // Активен ли таймер

  // Рефы для каждого инпута
  const inputs = useRef([]);

  // Обработчик ввода
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (value.length > 1) return; // Ограничение на 1 символ

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Автоматический переход на следующее поле
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Скрываем ошибку при любом изменении
    if (!!error) setError(false);
  };

  // Обработчик нажатия клавиш (Backspace)
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus(); // Переход на предыдущее поле
    }
  };

  // Проверка: все ли поля заполнены?
  const isComplete = code.every(c => c !== '');

  const resetCodeAndTimer = () => {
    setCode(['', '', '', '', '', '']);
    setTimeLeft(60);
    setIsTimerActive(true);
    setError('');
    inputs.current[0]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isTimerActive) {
      resetCodeAndTimer()
    } else if (isComplete && isTimerActive) {
      
      const fullCode = code.join('');
      mutate(fullCode, {
        onSuccess: (res) => {
          onVerify(res.message); // Успешная 2FA
        },
        onError: (error) => {
          setError(error.message);
        },
      });
    } else {
      return
    }
    
  };

  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  // Фокус при монтировании первого поля
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  return (
    <>     
      <button onClick={onBack} className={styles.back}> <img src={back} alt='logo'/> </button>
      <img src={logo} alt='logo' className={styles.logo}/>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <h2 className={styles.title}> Two-Factor Authentication</h2>
          <p className={styles.subtitle}>Enter the 6-digit code from the Google Authenticator&nbsp;app</p>
        </div>
        
        <div className={styles.inputs_content}>
          <ul className={styles.inputs}>
            {code.map((digit, index) => (
              <InputCode
                key={index}
                inputRef={(el) => (inputs.current[index] = el)}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
                index={index}                
                digit={digit}
                showError={!!error}
              />              
            ))}
          </ul>
          {!!error && (
            <div className={styles.error_text}> {error} </div>
          )}
        </div>
        {isTimerActive && isComplete &&
          <ButtonSubmit isPending={isPending} isFormValid={isComplete && isTimerActive} showError={!!error} name = 'Continue'/>
        }
        {!isTimerActive && <ButtonSubmit isFormValid={!isTimerActive} showError={!!error} name = 'Get new'/>       
        }
      </form>
      
    </>
  );
};