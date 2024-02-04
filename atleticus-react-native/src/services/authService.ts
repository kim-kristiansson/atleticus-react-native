import { User } from "../types/User";
import api from "./api";
import axios, { AxiosError } from "axios";

export const sendGoogleTokenToServer = async (token: string): Promise<User> => {
	try {
		const response = await api.post<any>("/authentication/google-signin", {
			token,
		});

		return response.data;
	} catch (error) {
		// Check if error is an AxiosError
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			console.error("Axios Error:", axiosError.message);

			if (axiosError.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log("Response Data:", axiosError.response.data);
				console.log("Response Status:", axiosError.response.status);
				console.log("Response Headers:", axiosError.response.headers);
			} else if (axiosError.request) {
				// The request was made but no response was received
				console.log("Request:", axiosError.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log("Error Message:", axiosError.message);
			}
			console.log("Config:", axiosError.config);
		} else {
			// Error is not an AxiosError
			console.error("Unknown Error", error);
		}

		throw error;
	}
};
