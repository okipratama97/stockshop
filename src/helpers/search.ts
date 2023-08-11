import { ILike } from 'typeorm'

export const makeSearch = (fields: Array<string>, search: string): any => {
	const arr = fields.map(field => {
		return {
			[field]: ILike(`%${search}%`)
		}
	})

	return arr
}
