import { useMutation } from '@tanstack/react-query';
import { login, signup, AuthResponse } from './api';

function persistAuth(result: AuthResponse) {
  localStorage.setItem('token', result.token);
  localStorage.setItem('user', JSON.stringify(result.user));
}

export function useSignup() {
  return useMutation({
    mutationFn: signup,
    onSuccess: persistAuth,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: persistAuth,
  });
}



