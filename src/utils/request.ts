import axios from 'axios';
import { PUBLIC_API_URL } from '$env/static/public';
import type { BaseResponse } from '@/types/response';

export const request = axios.create({
	baseURL: PUBLIC_API_URL,
});

request.interceptors.response.use(
	(response) => {
		// Any status code that lie within the range of 2xx cause
		// this function to trigger Do something with response data
		return response;
	},
	(err: { response: { data: BaseResponse } }) => {
		// Any status codes that falls outside the range of 2xx
		// cause this function to trigger Do something with
		// response error

		// console.error(err);

		const data = err.response?.data || {};
		return Promise.reject(data);
	},
);
