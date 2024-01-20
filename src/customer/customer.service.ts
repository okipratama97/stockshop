import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { makeResError } from 'src/helpers/error'
import { CustomerRepository } from './repositories/customer.repository'
import { APIResponse, apiResWrapper } from 'src/helpers/api-response'

@Injectable()
export class CustomerService {
	constructor(readonly customerRepository: CustomerRepository) {}

	async create(createCustomerDto: CreateCustomerDto) {
		try {
			await this.customerRepository.insert(createCustomerDto)

			return apiResWrapper(HttpStatus.OK, 'Successfully created new customer')
		} catch (error) {
			return Promise.reject(makeResError(error, HttpStatus.BAD_REQUEST, 'Cannot create new customer'))
		}
	}

	findAll() {
		return `This action returns all customer`
	}

	async findOne(id: string): Promise<APIResponse> {
		try {
			const customer = await this.customerRepository.findOne({ where: { id } })
			if (!customer) throw apiResWrapper(HttpStatus.NOT_FOUND, 'Cannot find customer')

			return apiResWrapper(HttpStatus.OK, 'Successfully find customer', customer)
		} catch (error) {
			return Promise.reject(makeResError(error, HttpStatus.NOT_FOUND, 'Cannot find customer'))
		}
	}

	update(id: number, updateCustomerDto: UpdateCustomerDto) {
		return `This action updates a #${id} customer`
	}

	remove(id: number) {
		return `This action removes a #${id} customer`
	}
}
