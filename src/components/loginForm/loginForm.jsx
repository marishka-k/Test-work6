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
  const [error, setError] = useState('');

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
        onError: (error) => {
          setError(error.message);
        },
      }
    );
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (!!error) setError('');
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (!!error) setError('');
  };

  return (
    <>
      <img src={logo} alt='logo' className={styles.logo}/>
      <form onSubmit={handleSubmit} className={styles.form}>      
        <h2 className={styles.title} >Sign in to your account to continue</h2>
        <div className={styles.inputs_content}>
          <ul className={styles.inputs}>
            <InputConteiner key='email' icon={emailIcon} type="email" placeholder = 'Email' text={email} onChange={handleChangeEmail} isPending={isPending} showError={!!error}/>
            <InputConteiner key='password' icon={passwordIcon} type="password" placeholder = 'Password' text={password} onChange={handleChangePassword} isPending={isPending} showError={!!error}/>
          </ul>
          {!!error && (
            <div className={styles.error_text}> {error} </div>
          )}
        </div>
        <ButtonSubmit isPending={isPending} isFormValid={isFormValid} showError={!!error} name = 'Log In'/>
        
      </form>
    </>  
    
  );
};