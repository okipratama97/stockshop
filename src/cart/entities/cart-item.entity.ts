import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Cart } from './cart.entity'
import { Item } from 'src/item/entities/item.entity'

@Entity({ name: 'carts_items' })
export class CartItem {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'int', default: 1 })
	quantity: number

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date

	//Relation Columns

	@Column({ type: 'varchar' })
	cart_id: string

	@Column({ type: 'varchar' })
	item_id: string

	@ManyToOne(() => Cart, cart => cart.cart_items, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'cart_id' })
	cart: Cart

	@ManyToOne(() => Item, item => item.cart_items)
	@JoinColumn({ name: 'item_id' })
	item: Item
}
