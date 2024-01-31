import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
	baseURL: "http://10.0.2.2:5000",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error(error);
		return Promise.reject(error);
	}
);

export default api;
