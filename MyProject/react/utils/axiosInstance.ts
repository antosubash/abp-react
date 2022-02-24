import axios from "axios";
import { User } from "oidc-client-ts";

export const getHeaders = async () => {
  const accessToken = await getAccessToken();
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : "";
  return headers;
};

export const getAccessToken = async () => {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${process.env.NEXT_PUBLIC_IDENTITY_URL}:${process.env.NEXT_PUBLIC_IDENTITY_CLIENT_ID}`
  );
  if (!oidcStorage) {
    return null;
  }
  return User.fromStorageString(oidcStorage).access_token;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

axiosInstance.interceptors.request.use(async function (config: any) {
  config.headers = await getHeaders();
  return config;
});

export default axiosInstance;
