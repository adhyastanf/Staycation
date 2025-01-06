import { useEffect } from 'react';
import useAuthStore from '../store/auth-store';

export const useAuth = () => {
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return null
};
