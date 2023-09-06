import { HttpException, HttpStatus } from '@nestjs/common'
import { APIResponse } from './api-response'

export const makeResError = (error: any, statusCode?: number, message?: string): APIResponse => {
	if (error.status_code) return error

	const res: APIResponse = {
		status_code: statusCode,
		message: error.message ? error.message : message
	}
	return res
}

export const genHttpException = (error: any): any => {
	const status = error?.status_code || HttpStatus.INTERNAL_SERVER_ERROR
	const message = error?.message || 'Internal Server Error'
	return new HttpException({ status, message }, status, { cause: error })
}
