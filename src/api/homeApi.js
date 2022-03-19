import axiosClient, { authHeader } from "./axiosClient";

const path = "/home";

const homeApi = {
  getHomeData() {
    const url = `${path}/`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
};

export default homeApi;
