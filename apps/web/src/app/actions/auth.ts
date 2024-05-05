import { authInstance } from '@/lib/axios';

export const getSession = async () => {
  return await authInstance.get('/auth/session').then((res) => res.data);
};
