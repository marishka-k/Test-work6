// src/utils/apiMock.js
export const mockLogin = async ({ email, password }) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (email === 'test@example.com' && password === 'password') {
    return { user: { email }, token: 'fake-jwt', is2FA: true };
  }
  throw new Error('Invalid email or password');
};

export const mockVerifyCode = async (code) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const validCode = '123456';
  const codeStr = Array.isArray(code) ? code.join('') : code;

  if (!codeStr || codeStr.length !== 6) {
    throw new Error('Код должен содержать 6 цифр');
  }

  if (codeStr === validCode) {
    return { success: true, message: 'Код верен' };
  }

  throw new Error('Неверный код');
};