import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_GATEWAY_URL,   // ✔ Dynamic & correct
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default axiosInstance;
