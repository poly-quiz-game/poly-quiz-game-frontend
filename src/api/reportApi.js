import axiosClient, { authHeader } from "./axiosClient";

const path = "/report";

const reportApi = {
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
  getPlayerInReport({id,offset,limit}) {
    const url = `${path}/${id}/players?offset=${offset}&limit=${limit}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
  getAllAnswerOfOnePlayer(id, playerId) {
    const url = `${path}/${id}/players/${playerId}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
  getQuestionsInReport({id,offset,limit}) {
    const url = `${path}/${id}/questions?offset=${offset}&limit=${limit}`;
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

export default reportApi;
