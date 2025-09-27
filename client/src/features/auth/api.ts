import api from '@/lib/api';

export type AuthResponse = {
  token: string;
  user: { id: string; email: string; name?: string };
};

export async function signup(payload: { email: string; password: string; name?: string }): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/signup', payload);
  return data;
}

export async function login(payload: { email: string; password: string }): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);
  return data;
}



