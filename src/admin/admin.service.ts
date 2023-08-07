import { Injectable } from '@nestjs/common'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { AdminRepository } from './repositories/admin.repository'

@Injectable()
export class AdminService {
	constructor(readonly adminRepository: AdminRepository) {}

	create(createAdminDto: CreateAdminDto) {
		return 'This action adds a new admin'
	}

	async findAll(): Promise<any> {
		try {
			console.log('==> AdminService -> findAll')
			const admins = await this.adminRepository.findByQuery()
			return {
				status: 'OK',
				code: 200,
				data: admins
			}
		} catch (error) {
			Promise.reject(new Error('Cannot resolve request'))
		}
	}

	findOne(id: number) {
		console.log('number:', id)
		return `This action returns a #${id} admin`
	}

	update(id: number, updateAdminDto: UpdateAdminDto) {
		return `This action updates a #${id} admin`
	}

	remove(id: number) {
		return `This action removes a #${id} admin`
	}
}
