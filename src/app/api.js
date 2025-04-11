import axios from "axios";

const API = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.url && !config.url.includes("/accounts/login") && !config.url.includes("/accounts/signup")) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
