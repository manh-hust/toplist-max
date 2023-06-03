import axios from 'axios';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}
		return response;
	}
	// (error) => {
	// 	throw error;
	// }
);
