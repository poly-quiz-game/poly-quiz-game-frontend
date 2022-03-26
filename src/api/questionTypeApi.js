import axiosClient from "./axiosClient";

const path = "/questionType";

const questionTypeApi = {
  getAll() {
    const url = path;
    return axiosClient.get(url, {});
  },
};

export default questionTypeApi;
