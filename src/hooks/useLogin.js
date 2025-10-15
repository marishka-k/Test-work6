import { useMutation } from '@tanstack/react-query';
import { mockLogin } from '../utils/apiMock';

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials) => mockLogin(credentials),
  });
};