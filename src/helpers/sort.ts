export function makeSort(order: string, sort: 'ASC' | 'DESC'): Record<string, any>

export function makeSort(order: Array<string>, sort: Array<'ASC' | 'DESC'>): Record<string, any>

export function makeSort(order: Record<string, any>, sort: null): Record<string, any>

export function makeSort(order: any, sort: any): Record<string, any> {
	if (!order) {
		return {
			created_at: 'DESC'
		}
	}
	if (sort === null) {
		return order
	} else if (Array.isArray(sort)) {
		const result: any = {}
		order.forEach((item: string) => {
			result[item] = sort[order.indexOf(item)]
		})
		return result
	} else {
		return {
			[order]: sort
		}
	}
}
