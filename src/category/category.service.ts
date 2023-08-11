import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { APIResponse, apiResWrapper } from 'src/helpers/api-response'
import { FindAllCategory } from './interfaces/category.interface'
import { makePag, popPag } from 'src/helpers/pagination'
import { CategoryRepository } from './repositories/category.repository'
import { makeSort } from 'src/helpers/sort'
import { makeSearch } from 'src/helpers/search'

@Injectable()
export class CategoryService {
	constructor(readonly categoryRepository: CategoryRepository) {}

	async create(createCategoryDto: CreateCategoryDto): Promise<APIResponse> {
		try {
			await this.categoryRepository.insert(createCategoryDto)

			return apiResWrapper(HttpStatus.OK, 'Successfully created new category')
		} catch (error) {
			Promise.reject(new Error('Cannot create new category'))
		}
	}

	async findAll(query: FindAllCategory): Promise<APIResponse> {
		try {
			const { offset, page, limit } = makePag(query.page, query.limit)
			const order = makeSort(query.order, query.sort)
			const findQuery = query.search ? makeSearch(['name'], query.search) : { id: query.id, name: query.name }

			const [categories, count] = await this.categoryRepository.findByQuery(findQuery, limit, offset, order)
			const pagination = popPag(page, limit, '', offset, count, query.order, query.sort)

			return apiResWrapper(HttpStatus.OK, 'Successfully find all categories', categories, pagination)
		} catch (error) {
			Promise.reject(new Error('Cannot find all categories'))
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} category`
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`
	}

	remove(id: number) {
		return `This action removes a #${id} category`
	}
}
