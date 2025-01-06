import { create } from 'zustand';
import { fetchGetDetailPlace } from '../utils/service';

const initialData = {
  loading: true,
  success: false,
  error: false,
  data: {},
  errorData: null,
};

const useDetailStore = create((set, get) => ({
  ...initialData,
  loadData: async (productId) => {
    const { data } = get();
    const checkData = data[productId];
    if (checkData) {
      return set((state) => ({ ...state, loading: false, success: true }));
    }

    try {
      set((state) => ({ ...state, loading: true }));
      const res = await fetchGetDetailPlace(productId);
      const data = res.data;
      const obj = { [productId]: data };
      return set((state) => ({ ...state, data: { ...state.data, ...obj }, loading: false, success: true }));
    } catch (error) {
      console.error(error);
      set((state) => ({ ...state, error: true, errorData: error, loading: false }));
    }
  },
}));

export default useDetailStore;
