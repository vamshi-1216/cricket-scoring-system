import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cricket-scoring-system-1.onrender.com",   // ✔ Dynamic & correct
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default axiosInstance;
