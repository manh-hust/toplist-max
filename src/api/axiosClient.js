import axios from 'axios';

const axiosClient = axios.create({
	// baseURL: 'https://toplist-max-api-production.up.railway.app/api',
	baseURL: 'http://localhost:8000/api',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		'Access-Control-Allow-Credentials': 'true',
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

export default axiosClient;
