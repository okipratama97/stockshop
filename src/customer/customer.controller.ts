import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Res } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { APIResponse } from 'src/helpers/api-response'
import { Response } from 'express'
import { genHttpException } from 'src/helpers/error'


@Controller('customers')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Post()
	async create(@Body() createCustomerDto: CreateCustomerDto) {
		return await this.customerService.create(createCustomerDto)
	}

	@Get()
	findAll() {
		return this.customerService.findAll()
	}

	@Get(':id')
	async findOne(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
		try {
			const serviceResponse: APIResponse = await this.customerService.findOne(id)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw genHttpException(e)
		}
	}

	@Patch(':id')
	update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
		return this.customerService.update(+id, updateCustomerDto)
	}

	@Delete(':id')
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.customerService.remove(+id)
	}
}
