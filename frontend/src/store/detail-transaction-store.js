import { create } from 'zustand';
import { fetchGetDetailTransaction, fetchGetUser, fetchUpdateUser } from '../utils/service';

const initialState = {
  loading: true,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

const useDetailTransactionStore = create((set, get) => ({
  ...initialState,
  loadData: async (id) => {
    try {
      set((state) => ({ ...state, loading: true, success: true }));
      const res = await fetchGetDetailTransaction(id);
      const data = res.data;
      return set((state) => ({ ...state, data, loading: false, success: true }));
    } catch (error) {
      console.error(error);
      set((state) => ({ ...state, error: true, errorData: error, loading: false }));
    }
  },
}));

export default useDetailTransactionStore;
