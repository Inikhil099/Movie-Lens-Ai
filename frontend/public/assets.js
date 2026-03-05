import axios from "axios";
const baseURL = "http://localhost:8000";
export const backendUrl = axios.create({ baseURL });
backendUrl.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
// export const backendUrl = "https://movie-lens-ai.onrender.com";
