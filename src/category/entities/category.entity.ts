import { Item } from 'src/item/entities/item.entity'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'categories' })
export class Category {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar', length: 50 })
	name: string

	@Column({ type: 'int' })
	order: number

	@Column({ type: 'varchar', length: 50 })
	image: string

	@Column({ type: 'jsonb', nullable: true })
	options: string

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date

	//Relation Columns

	@OneToMany(() => Item, item => item.category)
	items: Item[]
}
