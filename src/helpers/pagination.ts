export interface Pagination {
	offset: number
	limit: number
	page: number
}

export interface PaginationData {
	count: number
	limit: number
	offset: number
	order: string
	page: number
	page_total: number
	search: string
	sort: string
}

export const makePag = (page: string | number, limit: string | number): Pagination => {
	const _page: number = +page || 1
	const _limit: number = +limit || 10
	const offset: number = (_page - 1) * _limit
	return { offset, limit: _limit, page: _page }
}

export const popPag = (
	page: number,
	limit: number,
	search: string,
	offset: number,
	count: number,
	order?: string,
	sort: 'ASC' | 'DESC' = 'ASC'
): PaginationData => {
	return {
		count,
		limit,
		offset,
		order: order || 'id',
		page,
		page_total: count <= limit ? 1 : Math.ceil(count / limit),
		search: search || '',
		sort: sort == 'ASC' ? 'ASC' : 'DESC'
	}
}
