import axiosClient, { authHeader } from "./axiosClient";

const path = "/quiz";

const quizApi = {
  getAll({ offset, limit, search }) {
    const url = `${path}?offset=${offset}&limit=${limit}&search=${search}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
  create(quiz) {
    const url = path;

    return axiosClient.post(
      url,
      { quiz },
      {
        headers: authHeader(),
      }
    );
  },
  getOne(id) {
    const url = `${path}/${id}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
  update(id) {
    const url = `${path}/${id}`;
    return axiosClient.put(url, {
      headers: authHeader(),
    });
  },
  delete(id) {
    const url = `${path}/${id}`;
    return axiosClient.delete(url, {
      headers: authHeader(),
    });
  },
};

export default quizApi;
