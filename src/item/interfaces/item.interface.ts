export interface FindAllItem {
	id?: string
	name?: string
	page?: number
	limit?: number
	sort?: 'ASC' | 'DESC'
	order?: string
	search?: string
	category_id?: string
	max_price?: number
	min_price?: number
}
