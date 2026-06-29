import axios, {type InternalAxiosRequestConfig } from "axios";
import { type RefreshResponse, type AuthResponse, type Role } from "./types";
export const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
}) 

export async function getGenreImages() {
    const response = await api.get('images/genreImages')
    return response.data
}

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

api.interceptors.request.use((config: InternalAxiosRequestConfig ) => {
    if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
})

let refreshPromise: Promise<string | null> | null = null;

api.interceptors.response.use((response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }


    if (!refreshPromise) {
      refreshPromise = refreshToken().finally(() => {
        refreshPromise = null;
      });
    }

    const accessToken = await refreshPromise;

    if (accessToken) {
      originalRequest._retry = true;
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    }
    setAccessToken(null);
    window.location.href = '/login';
    return Promise.reject(error);
  },
);

async function refreshToken(): Promise<string | null> {
  try {
    const { data } = await api.post<RefreshResponse>(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    );
    setAccessToken(data.accessToken);
    return data.accessToken;
  } catch {
    return null;
  }
}



export const authApi = {
  register: (email: string, name: string, password: string, role: Role, nickname?: string,) => api.post<AuthResponse>('/auth/register', { email, name, password, role, nickname }),

  login: (email: string, password: string) => api.post<AuthResponse>('/auth/login', { email, password }),

  logout: () => api.post('/auth/logout'),

  getProfile: () => api.get('/auth/profile'),
};
