import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    Promise.reject(err);
  },
);

http.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  },
);

export default http;
