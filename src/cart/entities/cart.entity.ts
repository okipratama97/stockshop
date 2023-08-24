import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CartItem } from './cart-item.entity'
import { Customer } from 'src/customer/entities/customer.entity'

@Entity({ name: 'carts' })
export class Cart {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date

	//Relation Columns

	@Column({ type: 'varchar' })
	customer_id: string

	@OneToOne(() => Customer, customer => customer.cart)
	@JoinColumn({ name: 'customer_id' })
	customer: Customer

	@OneToMany(() => CartItem, cartItem => cartItem.cart, { cascade: ['insert'] })
	cart_items: CartItem[]
}
