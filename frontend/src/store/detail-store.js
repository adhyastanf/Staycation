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
  loadData: async (slug) => {
    const { data } = get();
    const checkData = data[slug];
    if (checkData) {
      return set((state) => ({ ...state, loading: false, success: true }));
    }

    try {
      set((state) => ({ ...state, loading: true }));
      const res = await fetchGetDetailPlace(slug);
      const data = res.data;

      if (!data) {
        return set((state) => ({ ...state, loading: false, success: true }));
      }

      const obj = { [slug]: data };
      return set((state) => ({ ...state, data: { ...state.data, ...obj }, loading: false, success: true }));
    } catch (error) {
      console.error(error);
      set((state) => ({ ...state, error: true, errorData: error, loading: false }));
    }
  },
}));

export default useDetailStore;
