export interface APIResponse {
	status_code: number
	message: string
	data?: Record<string, any> | Array<Record<string, any>>
	pagination?: Record<string, any>
}

export const apiResWrapper = (
	statusCode: number,
	message: string,
	data?: Record<string, any> | Array<Record<string, any>>,
	pagination?: Record<string, any>
): APIResponse => {
	const res: APIResponse = {
		status_code: statusCode,
		message,
		data,
		pagination
	}
	return res
}
