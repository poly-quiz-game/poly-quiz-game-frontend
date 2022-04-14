import axiosClient, { authHeader } from "./axiosClient";

const path = "/home";

const homeApi = {
  getHomeData() {
    const url = `${path}/`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
  getTopMaster() {
    const url = `${path}/top-master`;
    return axiosClient.get(url);
  },
};

export default homeApi;
