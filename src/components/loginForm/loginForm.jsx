import { useEffect, useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import logo from '../../images/logo.svg'
import emailIcon from '../../images/email.svg'
import passwordIcon from '../../images/password.svg'
import styles from './loginForm.module.css'
import InputConteiner from './inputConteiner/inputConteiner';
import { ButtonSubmit } from './buttonSubmit/buttonSubmit';

export const LoginForm = ({onSuccess, savedCredentials}) => {
  const { mutate, isPending } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.length >= 6;
  const isFormValid = isValidEmail && isValidPassword

  useEffect(() => {
    if (!!savedCredentials.email) setEmail(savedCredentials.email);
    if (!!savedCredentials.password) setPassword(savedCredentials.password);
  }, [savedCredentials]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.is2FA) {
            onSuccess({ email, password });
          }
        },
        onError: () => {
          setShowError(true);
        },
      }
    );
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (showError) setShowError(false);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (showError) setShowError(false);
  };

  return (
    <>
      <img src={logo} alt='logo' className={styles.logo}/>
      <form onSubmit={handleSubmit} className={styles.form}>      
        <h2 className={styles.title} >Sign in to your account to continue</h2>
        <div className={styles.inputs_content}>
          <ul className={styles.inputs}>
            <InputConteiner key='email' icon={emailIcon} type="email" placeholder = 'Email' text={email} onChange={handleChangeEmail} isPending={isPending} showError={showError}/>
            <InputConteiner key='password' icon={passwordIcon} type="password" placeholder = 'password' text={password} onChange={handleChangePassword} isPending={isPending} showError={showError}/>
          </ul>
          {showError && (
            <div className={styles.error_text}> Invalid email or password </div>
          )}
        </div>
        <ButtonSubmit isPending={isPending} isFormValid={isFormValid} showError={showError} name = 'Log In'/>
        
      </form>
    </>  
    
  );
};