export const mockLogin = async ({ email, password }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (email === 'test@example.com' && password === 'password') {
    return { user: { email }, token: 'fake-jwt', is2FA: true };
  }

  //аккаунт заблокирован
  if (email === 'locked@example.com') {
    throw new Error('Account is locked');
  }

  //email не подтверждён
  if (email === 'unverified@example.com') {
    throw new Error('Email not verified');
  }

  throw new Error('Invalid email or password');
};

export const mockVerifyCode = async (code) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const validCode = '123456';
  const codeStr = Array.isArray(code) ? code.join('') : code;

  if (!codeStr || codeStr.length !== 6) {
    throw new Error('Code must contain 6 digits');
  }

  if (codeStr === validCode) {
    return { success: true, message: 'Code is valid' };
  }

  throw new Error('Invalid code');
};