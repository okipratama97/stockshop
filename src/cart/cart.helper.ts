import { CartItem } from './entities/cart-item.entity'

export const reduceItemAmount = (cartItem: CartItem, amount: number): void => {
	cartItem.amount = cartItem.amount - amount
}
