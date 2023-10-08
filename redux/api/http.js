import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
// export const BASE_URL = "https://aplex-pharma-backend.onrender.com/api/v2";

const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const AxiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let store;

export const injectStore = (_store) => {
  store = _store;
};

AxiosPrivate.interceptors.request.use(
  (config) => {
    const token = store?.getState()?.auth?.token;

    if (token) {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;