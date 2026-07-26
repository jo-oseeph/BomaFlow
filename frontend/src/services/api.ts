/**
 * BomaFlow
 * Frontend API Client
 */
import axios from "axios";
import { getAccessToken } from "../lib/auth-token";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API ERROR",
      error.response?.data ?? error.message,
    );
    return Promise.reject(error);
  },
);

export default api;