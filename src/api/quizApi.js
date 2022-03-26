import axiosClient, { authHeader } from "./axiosClient";

const path = "/quiz";

const quizApi = {
  getAll({
    offset = 0,
    limit = 10,
    search = "",
    sortField = "",
    sortDirection = "desc",
  }) {
    const url = `${path}?offset=${offset}&limit=${limit}&search=${search}&sortField=${sortField}&sortDirection=${sortDirection}`;
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
  update(quiz) {
    const url = `${path}/${quiz.id}`;
    return axiosClient.put(
      url,
      { quiz },
      {
        headers: authHeader(),
      }
    );
  },
  delete(id) {
    const url = `${path}/${id}`;
    return axiosClient.delete(url, {
      headers: authHeader(),
    });
  },
};

export default quizApi;
