import axiosClient from "./axiosClient";

const quizApi = {
  getAll() {
    const url = "/quiz";
    return axiosClient.get(url, {});
  },
  getOne(id) {
    const url = "/quiz/" + id;
    return axiosClient.get(url, {});
  },
};

export default quizApi;
