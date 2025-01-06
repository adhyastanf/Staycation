import { create } from 'zustand';
import { fetchGetTransactions } from '../utils/service';

const initialState = {
  loading: {
    all: true,
    pending: true,
    canceled: true,
    paid: true,
  },
  success: false,
  error: false,
  data: {
    all: null,
    pending: null,
    canceled: null,
    paid: null,
  },
  errorData: null,
};

const useTransactionStore = create((set, get) => ({
  ...initialState,
  loadData: async (type) => {
    const endpointMap = {
      all: () => fetchGetTransactions(),
      pending: () => fetchGetTransactions('pending'),
      canceled: () => fetchGetTransactions('canceled'),
      paid: () => fetchGetTransactions('paid'),
    };

    const selectedEndpoint = endpointMap[type];
    try {
      const res = await selectedEndpoint();
      const data = res.data;
      return set((state) => ({
        ...state,
        data: { ...state.data, [type]: data },
        loading: { ...state.loading, [type]: false },
        success: true,
      }));
    } catch (error) {
      console.error(error);
      set((state) => ({
        ...state,
        loading: { ...state.loading, [type]: false },
        error: true,
        errorData: error,
      }));
    }
  },
}));

export default useTransactionStore;
