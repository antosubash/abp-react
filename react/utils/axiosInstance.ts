import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

axiosInstance.interceptors.request.use(async function (config: any) {
  return config;
});

export default axiosInstance;
