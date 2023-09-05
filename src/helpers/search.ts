import { ILike } from 'typeorm'

export const makeSearch = (fields: Array<string>, search: string, query?: any): any => {
	const arr = fields.map(field => {
		return {
			...query,
			[field]: ILike(`%${search}%`)
		}
	})

	return arr
}
