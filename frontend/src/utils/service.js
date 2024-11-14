import axios from 'axios';

// Membuat instance axios
const api = axios.create({
  baseURL: 'http://localhost:5000', // Ganti dengan URL API Anda
  withCredentials: true,
});

const BASE_URL = 'http://localhost:5000';

// Fungsi untuk refresh token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(BASE_URL.concat('/auth/refresh-token'), {
      token: Cookies.get('refreshToken'), // Ambil refresh token dari cookies
    });
    const { accessToken } = response.data;

    // Simpan access token baru ke cookies
    Cookies.set('token', accessToken, { expires: 1 }); // Simpan token selama 1 hari
    return accessToken;
  } catch (error) {
    console.error('Gagal mendapatkan access token baru:', error);
    throw error;
  }
};

const fetchLogin = async (data) => {
  const { username, password } = data;
  const body = { username, password };
  try {
    const res = await axios.post(BASE_URL.concat('/auth/login'), body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const fetchRegister = async (data) => {
  const { fullname, username, email, password } = data;
  const body = { fullname, username, email, password };
  try {
    const res = await axios.post(BASE_URL.concat('/auth/register'), body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Interceptor untuk menambahkan Access Token ke setiap permintaan
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // Ambil token dari cookies
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Tambahkan token ke header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani error response
api.interceptors.response.use(
  (response) => {
    return response; // Jika respons berhasil, kembalikan data
  },
  async (error) => {
    const originalRequest = error.config;

    // Jika error 401 (Unauthorized), coba lakukan refresh token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Lakukan refresh token
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Set access token baru ke header Authorization
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Kirim ulang permintaan asli dengan token baru
      }
    }

    return Promise.reject(error); // Jika gagal refresh token, kembalikan error
  }
);

export { fetchLogin, fetchRegister, refreshAccessToken };
