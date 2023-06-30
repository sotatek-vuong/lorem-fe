import type { RegisterSchemaType } from '@/components/modules/auth/Register/index.svelte';
import { request } from '@/utils/request';

type AuthResponse = {
	access_token: string;
	user: any;
};

export const register = async (body: RegisterSchemaType) => {
	const { data } = await request.post<AuthResponse>('/auth/register', body, {
		headers: { recaptcha: body.recaptcha },
	});

	return data;
};
