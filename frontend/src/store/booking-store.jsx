import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBookStore = create(
  persist(
    (set) => ({
      nigths: 0,
      bookingStartDate: null,
      bookingEndDate: null,
      price: null,
      imgUrl: null,
      city: null,
      country: null,
      name: null,
      productId: null,
      updateBooking: (bookingData) =>
        set((state) => ({ ...state, ...bookingData })),
    }),
    {
      name: 'booking-storage', // Nama yang akan digunakan di local storage
    }
  )
);

export default useBookStore;
