import axios from 'axios';
import Cookies from 'js-cookie';

// Membuat instance axios
const api = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT_URL, // Ganti dengan URL API Anda
  // withCredentials: true,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
});

const BASE_URL = import.meta.env.VITE_ENDPOINT_URL;

axios.defaults.headers.common['ngrok-skip-browser-warning'] = true;

// Interceptor untuk menambahkan Access Token ke setiap permintaan
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
    console.log(error);

    // Jika error 401 (Unauthorized), coba lakukan refresh token
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      // Lakukan refresh token
      const res = await refreshAccessToken();
      const newAccessToken = res.data.accessToken;

      if (newAccessToken) {
        // Set access token baru ke header Authorization
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Kirim ulang permintaan asli dengan token baru
      }
    }

    return Promise.reject(error); // Jika gagal refresh token, kembalikan error
  }
);

// Fungsi untuk refresh token
export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(BASE_URL.concat('/auth/refresh-token'), {
      token: Cookies.get('refreshToken'), // Ambil refresh token dari cookies
    });
    const { accessToken } = res.data.data;

    // Simpan access token baru ke cookies
    Cookies.set('token', accessToken, { expires: 1 }); // Simpan token selama 1 hari
    return res.data;
  } catch (error) {
    console.error('Gagal mendapatkan access token baru:', error);
    throw error;
  }
};

export const fetchLogin = async (data) => {
  const { username, password } = data;
  const body = { username, password };
  try {
    const res = await axios.post(BASE_URL.concat('/auth/login'), body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRegister = async (data) => {
  const { fullname, username, email, password } = data;
  const body = { fullname, username, email, password };
  try {
    const res = await axios.post(BASE_URL.concat('/auth/register'), body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetAuth = async () => {
  try {
    const res = await api.get('/auth/isAuth');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPostTransaction = async (body) => {
  try {
    const res = await api.post('/transaction', body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetHotels = async (id) => {
  try {
    const res = await axios.get(BASE_URL.concat('/place'), { params: { category: id } });
    return res.data;
  } catch (error) {
    a;
    throw error;
  }
};

export const fetchGetDetailPlace = async (id) => {
  try {
    const res = await axios.get(BASE_URL.concat(`/place/${id}`));
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetUser = async () => {
  try {
    const res = await api.get(`/auth/user`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetTransactions = async (status = '') => {
  try {
    const res = await api.get(`/transaction?status=${status}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateUser = async (body) => {
  try {
    const res = await api.put(`/auth/user`, body);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGetDetailTransaction = async (id) => {
  try {
    const res = await api.get(`/transaction/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
