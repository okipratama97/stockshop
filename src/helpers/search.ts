import { And, Between, ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm'

export const makeSearch = (fields: Array<string>, search: string, query?: any): any => {
	const arr = fields.map(field => {
		return {
			...query,
			[field]: ILike(`%${search}%`)
		}
	})

	return arr
}

export const makePriceLimit = (maxPrice?: number | string, minPrice?: number | string, query?: any): any => {
	if (minPrice == null) minPrice = 0
	if (maxPrice == null) maxPrice = 999999999
	maxPrice = +maxPrice
	minPrice = +minPrice

	return {
		...query,
		price: Between(minPrice, maxPrice)
	}
}