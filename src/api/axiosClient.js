import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    process.env.ENDPOINT ||
    "http://165.22.53.167:3005/api/quiz" ||
    "http://localhost:3005/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
