import { CartItem } from './entities/cart-item.entity'

export const reduceItemQuantity = (cartItem: CartItem, quantity: number): void => {
	cartItem.quantity = cartItem.quantity - quantity
}
