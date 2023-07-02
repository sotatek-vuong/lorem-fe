import { getProfile, type AuthResponse } from '@/api/auth.js';
import { JWT_STORE_KEY } from '@/utils/constants/key.js';
import { withJwt } from '@/utils/request';

export const load = withJwt(async (req, jwt) => {
	const user = await getProfile();
	return { user, access_token: jwt };
});
