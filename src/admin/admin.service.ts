import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { AdminRepository } from './repositories/admin.repository'
import { FindAllAdmin } from './interfaces/admin.interface'
import { APIResponse, apiResWrapper } from 'src/helpers/api-response'
import { makePag, popPag } from 'src/helpers/pagination'
import { makeSort } from 'src/helpers/sort'

@Injectable()
export class AdminService {
	constructor(readonly adminRepository: AdminRepository) {}

	create(createAdminDto: CreateAdminDto) {
		return 'This action adds a new admin'
	}

	async findAll(query: FindAllAdmin): Promise<APIResponse> {
		try {
			const { offset, page, limit } = makePag(query.page, query.limit)
			const order = makeSort(query.order, query.sort)
			const findQuery = { id: query.id, email: query.email }

			const [admins, count] = await this.adminRepository.findByQuery(findQuery, limit, offset, order)
			const pagination = popPag(page, limit, '', offset, count, query.order, query.sort)

			return apiResWrapper(HttpStatus.OK, 'Successfully find all admins', admins, pagination)
		} catch (error) {
			Promise.reject(new Error('Cannot find all admins'))
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} admin`
	}

	update(id: number, updateAdminDto: UpdateAdminDto) {
		return `This action updates a #${id} admin`
	}

	remove(id: number) {
		return `This action removes a #${id} admin`
	}
}
