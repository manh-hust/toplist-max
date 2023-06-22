import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'https://toplist-max-api-production.up.railway.app/api',
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

export default axiosClient;
