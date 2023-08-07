import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Admin } from '../entities/admin.entity'

@Injectable()
export class AdminRepository extends Repository<Admin> {
	constructor(
		@InjectRepository(Admin)
		private repository: Repository<Admin>
	) {
		super(repository.target, repository.manager, repository.queryRunner)
	}

	async findByQuery(): Promise<any> {
		try {
			console.log('=> AdminRepository > findByQuery')
			const result = await this.find()
			console.log('=> AdminRepository > findByQuery > result:', result)
			return result
		} catch (error) {
			return Promise.reject(new Error('Cannot query'))
		}
	}
}
