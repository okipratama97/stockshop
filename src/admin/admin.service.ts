import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { AdminRepository } from './repositories/admin.repository'
import { FindAllAdmin } from './interfaces/admin.interface'
import { APIResponse, apiResWrapper } from 'src/helpers/api-response'
import { makePag, popPag } from 'src/helpers/pagination'

@Injectable()
export class AdminService {
	constructor(readonly adminRepository: AdminRepository) {}

	create(createAdminDto: CreateAdminDto) {
		return 'This action adds a new admin'
	}

	async findAll(query: FindAllAdmin): Promise<APIResponse> {
		try {
			const { offset, page, limit } = makePag(query.page, query.limit)
			const findQuery = { id: query.id, email: query.email }

			const [admins, count] = await this.adminRepository.findByQuery(findQuery, limit, offset)
			const pagination = popPag(page, limit, '', offset, count)

			return apiResWrapper(HttpStatus.OK, 'Successfully find all admin', admins, pagination)
		} catch (error) {
			Promise.reject(new Error('Cannot find all admin'))
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
