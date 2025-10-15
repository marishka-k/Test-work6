
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginForm } from '../loginForm/loginForm';
import styles from './app.module.css'
import { useState } from 'react';
import { TwoFactorAuth } from '../twoFactorAuth/twoFactorAuth';

function App() {  
  const [screen, setScreen] = useState('login');
  const [savedCredentials, setSavedCredentials] = useState({ email: '', password: '' }); 
  const queryClient = new QueryClient();

  const handleLoginSuccess = (credentials) => {
    setSavedCredentials(credentials);
    setScreen('2fa');    
  };

  const handle2FABack = () => {
     setScreen('login');
     
  };

  const handle2FAVerify = (message) => {
    localStorage.setItem('token', 'fake-jwt-token');
    alert(`✅ ${message}`);  
  };

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <QueryClientProvider client={queryClient}>
          {screen === 'login'
          ? <LoginForm onSuccess={handleLoginSuccess} savedCredentials={savedCredentials}/>
          : <TwoFactorAuth onVerify={handle2FAVerify} onBack={handle2FABack}  />
          }
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
