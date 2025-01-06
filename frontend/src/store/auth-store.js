import { create } from 'zustand';
import Cookies from 'js-cookie';
import { fetchLogin, fetchRegister, fetchGetAuth } from '../utils/service';

const initialData = {
  loading: false,
  success: false,
  error: false,
  isAuth: false,
  errorData: null,
};

const useAuthStore = create((set) => ({
  ...initialData,
  // Handle login
  handleLogin: async (values) => {
    try {
      set({ loading: true });
      const res = await fetchLogin(values);
      const { accessToken, refreshToken } = res.data;

      Cookies.set('token', accessToken, { expires: 1 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });
      set({ isAuth: true, success: true, error: false, errorData: null });
    } catch (err) {
      set({ error: true, errorData: err, success: false });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  // Handle register
  handleRegister: async (values) => {
    try {
      set({ loading: true });
      await fetchRegister(values);
      set({ success: true, error: false, errorData: null });
    } catch (err) {
      set({ error: true, errorData: err, success: false });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  // Handle logout
  handleLogout: () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    set({ isAuth: false });
    window.location.reload(); // Optional: Reload page after logout
  },
  // Check authentication status
  checkAuthStatus: async () => {
    try {
      set({ loading: true });
      if (Cookies.get('token')) {
        const res = await fetchGetAuth();
        set({ isAuth: res?.auth || false });
      } else {
        set({ isAuth: false });
      }
    } catch (err) {
      set({ isAuth: false, error: true, errorData: err });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
