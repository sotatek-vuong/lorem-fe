import axios from 'axios';
import { PUBLIC_API_URL } from '$env/static/public';
import type { BaseResponse } from '@/types/response';
import cookies from 'js-cookie';
import { JWT_STORE_KEY } from './constants/key';
import _ from 'lodash';

export const request = axios.create({
	baseURL: PUBLIC_API_URL,
});

request.interceptors.request.use(
	(config) => {
		const token = cookies.get(JWT_STORE_KEY);
		if (token) {
			_.set(config, ['headers', 'Authorization'], `Bearer ${token}`);
		}
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	},
);

request.interceptors.response.use(
	(response) => {
		return response;
	},
	(err: { response: { data: BaseResponse } }) => {
		// console.error(err);

		const data = err.response?.data || {};
		return Promise.reject(data);
	},
);

export const withJwt = (fn: LayoutLoad) => {
	return (req: any) => {
		try {
			const jwt = req.cookies.get(JWT_STORE_KEY);
			if (jwt) {
				request.defaults.headers.Authorization = `Bearer ${jwt}`;
			}
			return fn(req, jwt);
		} catch (err) {
			console.log({ err });
			throw err;
		} finally {
			delete request.defaults.headers.Authorization;
		}
	};
};
