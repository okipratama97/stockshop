import { Module } from '@nestjs/common'
import { CartService } from './cart.service'
import { CartController } from './cart.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from './entities/cart.entity'
import { CartRepository } from './repositories/cart.repository'
import { CartItem } from './entities/cart-item.entity'
import { ItemModule } from 'src/item/item.module'
import { CartItemRepository } from './repositories/cart-item.repository'

@Module({
	imports: [TypeOrmModule.forFeature([Cart, CartItem]), ItemModule],
	controllers: [CartController],
	providers: [CartService, CartRepository, CartItemRepository],
	exports: [CartService]
})
export class CartModule {}
