import axiosClient from "./axiosClient";

const path = "/auth/google-login";

const authApi = {
	login(data) {
		const url = path;
		return axiosClient.post(url, data);
	},
	getOne(id) {
		const url = `${path}/${id}`;
		return axiosClient.get(url, {});
	},
	update(id) {
		const url = `${path}/${id}`;
		return axiosClient.put(url, {});
	},
	delete(id) {
		const url = `${path}/${id}`;
		return axiosClient.delete(url);
	},
};

export default authApi;
