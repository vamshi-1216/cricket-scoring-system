import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",   // Gateway URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default axiosInstance;
