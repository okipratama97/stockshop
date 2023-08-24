import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateCartDto } from './dto/create-cart.dto'
import { UpdateCartDto } from './dto/update-cart.dto'
import { APIResponse, apiResWrapper } from 'src/helpers/api-response'
import { CartRepository } from './repositories/cart.repository'
import { makeResError } from 'src/helpers/error'
import { ItemRepository } from 'src/item/repositories/item.repository'
import { Cart } from './entities/cart.entity'
import { CartItemRepository } from './repositories/cart-item.repository'
import { AddItemToCartDto } from './dto/add-item-to-cart.dto copy'
import { RemoveItemFromCartDto } from './dto/remove-item-from-cart.dto'
import { reduceItemAmount } from './cart.helper'

@Injectable()
export class CartService {
	constructor(readonly cartRepository: CartRepository, readonly cartItemRepository: CartItemRepository, readonly itemRepository: ItemRepository) {}

	create(createCartDto: CreateCartDto) {
		return 'This action adds a new cart'
	}

	async addItem(itemDto: AddItemToCartDto, customer: any): Promise<APIResponse> {
		try {
			// validate item
			const item = await this.itemRepository.findOne({ where: { id: itemDto.item_id } })
			if (!item) throw apiResWrapper(HttpStatus.BAD_REQUEST, 'Cannot find item')
			if (item.stock < itemDto.amount || item.status !== 'AVAILABLE') throw apiResWrapper(HttpStatus.BAD_REQUEST, 'Item not available')

			// create cart if not available
			let cart: Cart
			const findCart = await this.cartRepository.findOne({ where: { customer_id: customer.id }, relations: { cart_items: true } })
			if (!findCart) {
				cart = this.cartRepository.create({ customer_id: customer.id })
				const iCart = await this.cartRepository.insert(cart)
				cart.id = iCart.identifiers[0].id
			} else {
				cart = findCart
			}

			// check if item already inside cart
			const isAlreadyInCart = cart.cart_items?.find(item => item.item_id)
			if (!isAlreadyInCart) {
				// insert item to cart
				await this.cartItemRepository.insert({ amount: itemDto.amount, cart_id: cart.id, item_id: item.id })
			}

			// get the cart with items to return
			const cartResult = await this.cartRepository.findOne({ where: { id: cart.id }, relations: { cart_items: { item: true } } })

			return apiResWrapper(HttpStatus.OK, 'Successfully added item to cart', cartResult)
		} catch (error) {
			return Promise.reject(makeResError(error, HttpStatus.BAD_REQUEST, 'Cannot add item to cart'))
		}
	}

	async removeItem(itemDto: RemoveItemFromCartDto, customer: any): Promise<APIResponse> {
		try {
			// validate item
			const item = await this.itemRepository.findOne({ where: { id: itemDto.item_id } })
			if (!item) throw apiResWrapper(HttpStatus.BAD_REQUEST, 'Cannot find item')

			// find cart
			const cart = await this.cartRepository.findOne({ where: { customer_id: customer.id }, relations: { cart_items: true } })
			if (!cart) throw apiResWrapper(HttpStatus.BAD_REQUEST, 'Cannot find cart')

			// validate item in cart
			const cartItem = cart.cart_items.find(item => item.item_id)
			if (!cartItem) throw apiResWrapper(HttpStatus.BAD_REQUEST, 'Item is not in cart')
			if (itemDto.amount > cartItem.amount) throw apiResWrapper(HttpStatus.BAD_REQUEST, 'Unable to remove item because of amount')

			// remove item from cart
			reduceItemAmount(cartItem, itemDto.amount)
			if (cartItem.amount === 0) await this.cartItemRepository.remove(cartItem)
			else await this.cartItemRepository.save(cartItem)

			// get the cart with items to return
			const cartResult = await this.cartRepository.findOne({ where: { id: cart.id }, relations: { cart_items: { item: true } } })

			return apiResWrapper(HttpStatus.OK, 'Successfully removed item from cart', cartResult)
		} catch (error) {
			return Promise.reject(makeResError(error, HttpStatus.BAD_REQUEST, 'Cannot remove item from cart'))
		}
	}

	findAll() {
		return `This action returns all cart`
	}

	async findOne(id: string): Promise<APIResponse> {
		try {
			const cart = await this.cartRepository.findOne({ where: { id }, relations: { cart_items: { item: true } } })
			if (!cart) throw apiResWrapper(HttpStatus.NOT_FOUND, 'Cannot find cart')

			return apiResWrapper(HttpStatus.OK, 'Successfully find cart', cart)
		} catch (error) {
			return Promise.reject(makeResError(error, HttpStatus.NOT_FOUND, 'Cannot find cart'))
		}
	}

	update(id: number, updateCartDto: UpdateCartDto) {
		return `This action updates a #${id} cart`
	}

	async deleteCart(id: string, customer_id: string) {
		try {
			const cart = await this.cartRepository.findOne({ where: { id, customer_id } })
			if (!cart) throw apiResWrapper(HttpStatus.BAD_REQUEST, 'Cannot find cart')

			await this.cartRepository.remove(cart)

			return apiResWrapper(HttpStatus.OK, 'Successfully removed cart', cart)
		} catch (error) {
			return Promise.reject(makeResError(error, HttpStatus.BAD_REQUEST, 'Cannot removed cart'))
		}
	}
}
