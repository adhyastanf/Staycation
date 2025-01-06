import { create } from 'zustand';
import { fetchGetHotels } from '../utils/service';

const initialData = {
  loading: { backyard: true, livingRoom: true, kitchenSet: true },
  success: false,
  error: false,
  data: { backyard: null, livingRoom: null, kitchenSet: null },
  errorData: null,
};

const useHomeStore = create((set) => ({
  ...initialData,
  loadData: async (category, id) => {
    try {
      set((state) => ({
        ...state,
        loading: { ...state.loading, [category]: true },
        success: false,
        error: false,
      }));

      const res = await fetchGetHotels(id);
      const data = res.data;

      set((state) => ({
        ...state,
        data: { ...state.data, [category]: data },
        loading: { ...state.loading, [category]: false },
        success: true,
      }));
    } catch (error) {
      console.error(error);
      set((state) => ({
        ...state,
        error: true,
        errorData: error,
        loading: { ...state.loading, [category]: false },
      }));
    }
  },
}));

export default useHomeStore;
