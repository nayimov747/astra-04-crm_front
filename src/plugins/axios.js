import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8505/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 token avtomatik qo‘shish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && !config.url.includes("/users/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
