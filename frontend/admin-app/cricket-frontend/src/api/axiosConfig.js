import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://team-production-35c9.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
