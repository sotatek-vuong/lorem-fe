import type { RegisterSchemaType } from '@/components/modules/auth/Register.svelte';
import type { LoginSchemaType } from '@/components/modules/auth/Login.svelte';
import { request } from '@/utils/request';
import Cookies from 'js-cookie';
import { JWT_STORE_KEY } from '@/utils/constants/key';

export type AuthResponse = {
	access_token: string;
	user: {
		id: number;
		username: string;
		email: string;
		edges: object;
	};
};

export const register = async (body: RegisterSchemaType) => {
	const { data } = await request.post<AuthResponse>('/auth/register', body, {
		headers: { recaptcha: body.recaptcha },
	});

	Cookies.set(JWT_STORE_KEY, data.access_token);

	return data;
};

export const login = async (body: LoginSchemaType) => {
	const { data } = await request.post<AuthResponse>('/auth/login', body, {
		headers: { recaptcha: body.recaptcha },
	});

	Cookies.set(JWT_STORE_KEY, data.access_token);

	return data;
};

export const getProfile = async () => {
	const { data } = await request.get<AuthResponse['user']>('/auth/profile');

	return data;
};
