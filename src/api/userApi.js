import axiosClient, { authHeader } from "./axiosClient";

const path = "/user";

const userApi = {
  getOne() {
    const url = `${path}/profile/user`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
  getCount({start, end}) {
    const url = `${path}/user/count?start=${start}&end=${end}`;
    return axiosClient.get(url, {
      headers: authHeader(),
    });
  },
};

export default userApi;
