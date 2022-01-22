import axios from "axios";

// const baseURL = process.env.ENDPOINT;
// const baseURL = "http://165.22.53.167:3005/api";
const baseURL = "http://localhost:3005/api";

const axiosClient = axios.create({
  baseURL,
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

const token = localStorage.getItem("access_token");
axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { status } = error.toJSON();
    if (status === 401) {
      // return alert("401");
      return (location.href = "/auth/login");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
