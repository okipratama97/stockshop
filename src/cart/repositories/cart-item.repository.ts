import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CartItem } from '../entities/cart-item.entity'

@Injectable()
export class CartItemRepository extends Repository<CartItem> {
	constructor(
		@InjectRepository(CartItem)
		private repository: Repository<CartItem>
	) {
		super(repository.target, repository.manager, repository.queryRunner)
	}
}
