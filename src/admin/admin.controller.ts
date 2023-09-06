import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, HttpException, HttpStatus, UseFilters } from '@nestjs/common'
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { Response } from 'express'
import { OutgoingMessage } from 'http'
import { APIResponse } from 'src/helpers/api-response'
import { FindAllAdmin } from './interfaces/admin.interface'
import { popHttpException } from 'src/helpers/error'

@Controller('admins')
// @UseFilters(new HttpExceptionFilter()) can be scoped here
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post()
	create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminService.create(createAdminDto)
	}

	@Get()
	// @UseFilters(new HttpExceptionFilter()) can be scoped here
	async findAll(@Res() res: Response, @Query() query: FindAllAdmin): Promise<OutgoingMessage> {
		try {
			const serviceResponse: APIResponse = await this.adminService.findAll(query)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw popHttpException(e)
		}
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.adminService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
		return this.adminService.update(+id, updateAdminDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.adminService.remove(+id)
	}
}
