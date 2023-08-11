import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from '../entities/category.entity'

@Injectable()
export class CategoryRepository extends Repository<Category> {
	constructor(
		@InjectRepository(Category)
		private repository: Repository<Category>
	) {
		super(repository.target, repository.manager, repository.queryRunner)
	}

	async findByQuery(query?: any, limit?: number, offset?: number, order?: Record<string, any>): Promise<[Category[], number]> {
		try {
			const result = await this.findAndCount({
				where: query,
				take: limit,
				skip: offset,
				order
			})
			return result
		} catch (error) {
			return Promise.reject(new Error('Cannot query'))
		}
	}
}
