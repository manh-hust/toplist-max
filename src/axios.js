import axios from 'axios';
const axiosApi = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosApi.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('shopi_token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

let isRefreshing = false;
axiosApi.interceptors.response.use(
	(response) => {
		return response.data;
	},
	async (error) => {
		const originalRequest = error.config;
		if (!isRefreshing && error.response.status === 401) {
			isRefreshing = true;
			const refreshToken = localStorage.getItem('shopi_refresh_token');
			if (refreshToken) {
				try {
					const {
						data: { access_token, refresh_token, expires_in },
					} = await axios.post(
						process.env.REACT_APP_API_URL + '/auth/refresh/',
						{
							refresh_token: refreshToken,
						}
					);

					localStorage.setItem('shopi_token', access_token);
					localStorage.setItem('shopi_refresh_token', refresh_token);
					localStorage.setItem('shopi_expires_in', expires_in);

					axiosApi.defaults.headers.common[
						'Authorization'
					] = `Bearer ${access_token}`;
					originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

					isRefreshing = false;
					return axiosApi(originalRequest);
				} catch (err) {
					console.log(err.message);
				}
			}
		}
		return Promise.reject(error);
	}
);

export default axiosApi;
