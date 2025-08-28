import axios, { type AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
	baseURL:
		import.meta.env.MODE == "development" ? "http://localhost:5001" : "/",
	withCredentials: true,
});

export default axiosInstance;


