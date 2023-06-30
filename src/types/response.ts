export type BaseResponse<T = never> = T & {
	status_code?: number;
	message?: string;
	errors?: string[];
	code?: string;
};
