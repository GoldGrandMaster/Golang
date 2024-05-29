import axios from "axios";
import { API_URL } from "./config";

const Axios = axios.create({
  baseURL: API_URL,
});

const getAccessToken = () => localStorage.getItem("accessToken");

Axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getAccessToken();
    return config;
  },
  (error) => console.error(error)
);

Axios.interceptors.response.use(
  (e) => e,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await Axios.post("/auth/refresh-tokens", {
            refreshToken,
          });
          const newAccessToken = data.access.token;
          const newRefreshToken = data.refresh.token;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          Axios.defaults.headers.common["Authorization"] = newAccessToken;
          Axios(originalRequest);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return Promise.reject(error.response);
  }
);

export default Axios;
