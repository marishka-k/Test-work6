// src/hooks/useVerifyCode.js
import { useMutation } from '@tanstack/react-query';
import { mockVerifyCode } from '../utils/apiMock';

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: (code) => mockVerifyCode(code),
  });
};