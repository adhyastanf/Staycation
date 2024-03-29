import { create } from 'zustand';

export const useBookStore = create((set) => ({
  bookingData: {
    stay: 0,
    date: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
  },
  incrementStay: () => set((state) => ({ bookingData: { ...state.bookingData, stay: state.bookingData.stay + 1 } })),
  decrementStay: () => set((state) => ({ bookingData: { ...state.bookingData, stay: state.bookingData.stay - 1 } })),
}));
