import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Customer } from '../entities/customer.entity'

@Injectable()
export class CustomerRepository extends Repository<Customer> {
	constructor(
		@InjectRepository(Customer)
		private repository: Repository<Customer>
	) {
		super(repository.target, repository.manager, repository.queryRunner)
	}
}
