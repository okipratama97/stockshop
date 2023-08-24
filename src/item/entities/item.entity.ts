import { CartItem } from 'src/cart/entities/cart-item.entity'
import { Category } from 'src/category/entities/category.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'items' })
export class Item {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar', length: 50 })
	name: string

	@Column({ type: 'jsonb', nullable: true })
	images: string

	@Column({ type: 'text' })
	description: string

	@Column({ type: 'int' })
	price: number

	@Column({ type: 'int' })
	stock: number

	@Column({ type: 'varchar', length: 20, default: 'AVAILABLE' })
	status: string

	@Column({ type: 'boolean', default: false })
	is_featured: boolean

	@Column({ type: 'jsonb', nullable: true })
	options: string

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date

	//Relation Columns

	@Column({ type: 'varchar' })
	category_id: string

	@ManyToOne(() => Category, category => category.items)
	@JoinColumn({ name: 'category_id' })
	category: Category

	@OneToMany(() => CartItem, cartItem => cartItem.item)
	cart_items: CartItem[]
}
