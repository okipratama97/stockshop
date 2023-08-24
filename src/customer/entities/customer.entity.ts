import { Cart } from 'src/cart/entities/cart.entity'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'customers' })
export class Customer {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar', length: 50 })
	name: string

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string

	@Column({ type: 'varchar', length: 200 })
	password: string

	@Column({ type: 'varchar', length: 18 })
	phone: string

	@Column({ type: 'text' })
	address: string

	@Column({ type: 'varchar', length: 50, nullable: true })
	image: string

	@Column({ default: 'ACTIVE', length: 20 })
	status: string

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date

	// Relation Columns

	@OneToOne(() => Cart)
	cart: Cart
}
