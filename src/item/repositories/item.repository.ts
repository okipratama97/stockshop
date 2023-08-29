import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Item } from '../entities/item.entity'

@Injectable()
export class ItemRepository extends Repository<Item> {
	constructor(
		@InjectRepository(Item)
		private repository: Repository<Item>
	) {
		super(repository.target, repository.manager, repository.queryRunner)
	}

	async findByQuery(query?: any, limit?: number, offset?: number, order?: Record<string, any>): Promise<[Item[], number]> {
		try {
			const result = await this.findAndCount({
				where: query,
				take: limit,
				skip: offset,
				order,
				relations: ['category']
			})
			return result
		} catch (error) {
			return Promise.reject(new Error('Cannot query'))
		}
	}
}
