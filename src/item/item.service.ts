import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { makePag, popPag } from 'src/helpers/pagination'
import { makeSort } from 'src/helpers/sort'
import { makeSearch } from 'src/helpers/search'
import { APIResponse, apiResWrapper } from 'src/helpers/api-response'
import { ItemRepository } from './repositories/item.repository'
import { FindAllItem } from './interfaces/item.interface'
import { CategoryRepository } from 'src/category/repositories/category.repository'
import { makeResError } from 'src/helpers/error'

@Injectable()
export class ItemService {
	constructor(readonly itemRepository: ItemRepository, readonly categoryRepository: CategoryRepository) {}

	async create(createItemDto: CreateItemDto): Promise<APIResponse> {
		try {
			const cat = await this.categoryRepository.findOne({ where: { id: createItemDto.category_id } })
			if (!cat) throw apiResWrapper(HttpStatus.BAD_REQUEST, 'Invalid category')

			await this.itemRepository.insert(createItemDto)

			return apiResWrapper(HttpStatus.OK, 'Successfully created new item')
		} catch (error) {
			return Promise.reject(makeResError(error, HttpStatus.BAD_REQUEST, 'Cannot create new item'))
		}
	}

	async findAll(query: FindAllItem): Promise<APIResponse> {
		try {
			const { offset, page, limit } = makePag(query.page, query.limit)
			const order = makeSort(query.order, query.sort)
			const baseQuery = { id: query.id, name: query.name, category_id: query.category_id }
			const findQuery = query.search ? makeSearch(['name'], query.search, baseQuery) : baseQuery

			const [items, count] = await this.itemRepository.findByQuery(findQuery, limit, offset, order)
			const pagination = popPag(page, limit, '', offset, count, query.order, query.sort)

			return apiResWrapper(HttpStatus.OK, 'Successfully find all items', items, pagination)
		} catch (error) {
			return Promise.reject(makeResError(error, HttpStatus.BAD_REQUEST, 'Cannot find all items'))
		}
	}

	async findOne(id: string): Promise<APIResponse> {
		try {
			const item = await this.itemRepository.findOne({ where: { id } })
			if (!item) throw apiResWrapper(HttpStatus.NOT_FOUND, 'Cannot find item')

			return apiResWrapper(HttpStatus.OK, 'Successfully find item', item)
		} catch (error) {
			return Promise.reject(makeResError(error, HttpStatus.NOT_FOUND, 'Cannot find item'))
		}
	}

	update(id: number, updateItemDto: UpdateItemDto) {
		return `This action updates a #${id} item`
	}

	remove(id: number) {
		return `This action removes a #${id} item`
	}
}
