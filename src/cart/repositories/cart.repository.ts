import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Cart } from '../entities/cart.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CartRepository extends Repository<Cart> {
	constructor(
		@InjectRepository(Cart)
		private repository: Repository<Cart>
	) {
		super(repository.target, repository.manager, repository.queryRunner)
	}

	async findByQuery(query?: any, limit?: number, offset?: number, order?: Record<string, any>): Promise<[Cart[], number]> {
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
