import { APIResponse } from './api-response'

export const makeResError = (error: any, statusCode?: number, message?: string): APIResponse => {
	if (error.status_code) return error

	const res: APIResponse = {
		status_code: statusCode,
		message: error.message ? error.message : message
	}
	return res
}
