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

	async findByQuery(query?: any, limit?: number, offset?: number): Promise<[Admin[], number]> {
		try {
			const result = await this.findAndCount({
				where: query,
				take: limit,
				skip: offset
			})
			return result
		} catch (error) {
			return Promise.reject(new Error('Cannot query'))
		}
	}
}
