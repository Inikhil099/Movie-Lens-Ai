import axios from "axios";
const url = process.env.NEXT_PUBLIC_API_URL;
const baseURL = url;
export const backendUrl = axios.create({ baseURL });
backendUrl.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
