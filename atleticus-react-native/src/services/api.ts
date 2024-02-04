import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
	baseURL: "https://da8e-185-172-79-145.ngrok-free.app",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Log the error message
		console.error("Axios Error Message:", error.message);

		// Conditionally log the error response if available
		if (error.response) {
			console.error("Error Response Data:", error.response.data);
			console.error("Error Response Status:", error.response.status);
			console.error("Error Response Headers:", error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			console.error("Error Request:", error.request);
		} else {
			// Something else happened in setting up the request that triggered an error
			console.error("Error Setup:", error.message);
		}

		// If you have error handling logic, other than logging, it can go here.

		return Promise.reject(error);
	}
);

export default api;
