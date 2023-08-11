export interface FindAllCategory {
	id?: string
	name?: string
	page?: number
	limit?: number
	sort?: 'ASC' | 'DESC'
	order?: string
	search?: string
}
