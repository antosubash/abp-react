import { setup } from "axios-cache-adapter";
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

const axiosInstance = setup({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  cache: {
    // Invalidate only when a specific option is passed through config
    invalidate: async (config: any, request: any) => {
      if (request.clearCacheEntry) {
        await config?.store?.removeItem(config.uuid);
      }
    },
  },
});

axiosInstance.interceptors.request.use(async function (config: any) {
  config.headers = await getHeaders();
  return config;
});

export default axiosInstance;
