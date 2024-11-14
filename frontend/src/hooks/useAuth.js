// hooks/useAuth.js
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('token'); // Mengambil token dari cookie

      if (token) {
        try {
          const decoded = jwtDecode(token); // Decode token untuk mendapatkan info kadaluarsa
          const currentTime = Date.now() / 1000; // Konversi milidetik ke detik

          if (decoded.exp && decoded.exp > currentTime) {
            // Jika token memiliki expiration dan belum kadaluarsa
            setIsAuthenticated(true);
          } else {
            // Jika token sudah kadaluarsa
            setIsAuthenticated(false);
            Cookies.remove('token'); // Hapus token yang kadaluarsa
          }
        } catch (error) {
          // Jika terjadi error saat decoding token (token tidak valid)
          console.error('Token decoding error:', error);
          setIsAuthenticated(false);
        }
      } else {
        // Jika token tidak ada
        setIsAuthenticated(false);
      }
      setLoading(false); // Hentikan loading setelah pemeriksaan selesai
    };

    checkAuth();
  }, []);

  return { isAuthenticated, loading };
};
