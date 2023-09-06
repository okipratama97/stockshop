import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Res,
	Query,
	HttpException,
	HttpStatus,
	UseFilters,
	ParseUUIDPipe,
	UseGuards,
	SetMetadata
} from '@nestjs/common'
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { Response } from 'express'
import { OutgoingMessage } from 'http'
import { APIResponse } from 'src/helpers/api-response'
import { FindAllAdmin } from './interfaces/admin.interface'
import { genHttpException } from 'src/helpers/error'
import { AuthGuard } from 'src/guards/auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'
import { Roles } from 'src/guards/decorators/roles.decorator'

@Controller('admins')
// @UseFilters(new HttpExceptionFilter()) can be scoped here
export class AdminController {
	constructor(private readonly adminService: AdminService) {}

	@Post()
	create(@Body() createAdminDto: CreateAdminDto) {
		return this.adminService.create(createAdminDto)
	}

	@Get()
	@Roles('admin')
	@UseGuards(AuthGuard, RolesGuard)
	// @UseFilters(new HttpExceptionFilter()) can be scoped here
	async findAll(@Res() res: Response, @Query() query: FindAllAdmin): Promise<OutgoingMessage> {
		try {
			const serviceResponse: APIResponse = await this.adminService.findAll(query)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw genHttpException(e)
		}
	}

	@Get(':id')
	findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.adminService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAdminDto: UpdateAdminDto) {
		return this.adminService.update(+id, updateAdminDto)
	}

	@Delete(':id')
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.adminService.remove(+id)
	}
}
