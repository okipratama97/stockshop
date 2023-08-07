import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'admins' })
export class Admin {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar' })
	name: string

	@Column({ type: 'varchar', unique: true })
	email: string

	@Column({ type: 'varchar' })
	password: string

	@Column({ type: 'varchar', nullable: true })
	image: string

	@Column({ default: 'ACTIVE' })
	status: string

	@CreateDateColumn({ type: 'timestamp' })
	created_at: Date

	@UpdateDateColumn({ type: 'timestamp' })
	updated_at: Date
}
