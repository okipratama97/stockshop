import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'admins' })
export class Admin {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar', length: 50 })
	name: string

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string

	@Column({ type: 'varchar', length: 200 })
	password: string

	@Column({ type: 'varchar', length: 50, nullable: true })
	image: string

	@Column({ default: 'ACTIVE', length: 20 })
	status: string

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date
}
