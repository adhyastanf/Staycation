import { create } from 'zustand';
import { fetchGetUser, fetchUpdateUser } from '../utils/service';

const initialState = {
  loading: { data: true, update: false },
  success: false,
  error: false,
  data: null,
  errorData: null,
};

const useProfileStore = create((set, get) => ({
  ...initialState,
  loadData: async (type) => {
    try {
      set((state) => ({ ...state, loading: { ...state.loading, [type]: true }, success: true }));
      const res = await fetchGetUser();
      const data = res.data;
      return set((state) => ({ ...state, data, loading: { ...state.loading, [type]: false }, success: true }));
    } catch (error) {
      console.error(error);
      set((state) => ({ ...state, error: true, errorData: error, loading: { ...state.loading, [type]: false } }));
    }
  },
  updateUser: async (body, type) => {
    const { loadData } = get();
    set((state) => ({ ...state, loading: { ...state.loading, [type]: true } }));
    try {
      await fetchUpdateUser(body);
      await loadData('data')
      return set((state) => ({ ...state, loading: { ...state.loading, [type]: false }, success: true }));
    } catch (error) {
      console.error(error);
      set((state) => ({ ...state, error: true, errorData: error, loading: { ...state.loading, [type]: false } }));
    }
  },
}));

export default useProfileStore;
