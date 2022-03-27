import axiosClient from "./axiosClient";

const path = "/questionTime";

const questionTimeApi = {
  getAll() {
    const url = path;
    return axiosClient.get(url, {});
  },
};

export default questionTimeApi;
