import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.LOCAL_SERVER_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance
