import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, ParseUUIDPipe } from '@nestjs/common'
import { ItemService } from './item.service'
import { CreateItemDto } from './dto/create-item.dto'
import { UpdateItemDto } from './dto/update-item.dto'
import { APIResponse } from 'src/helpers/api-response'
import { FindAllItem } from './interfaces/item.interface'
import { Response } from 'express'
import { genHttpException } from 'src/helpers/error'

@Controller('items')
export class ItemController {
	constructor(private readonly itemService: ItemService) {}

	@Post()
	async create(@Res() res: Response, @Body() createItemDto: CreateItemDto) {
		try {
			const serviceResponse: APIResponse = await this.itemService.create(createItemDto)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw genHttpException(e)
		}
	}

	@Get('public')
	async findAll(@Res() res: Response, @Query() query: FindAllItem) {
		try {
			const serviceResponse: APIResponse = await this.itemService.findAll(query)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw genHttpException(e)
		}
	}

	@Get('public/:id')
	async findOne(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
		try {
			const serviceResponse: APIResponse = await this.itemService.findOne(id)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw genHttpException(e)
		}
	}

	@Patch(':id')
	update(@Param('id', ParseUUIDPipe) id: string, @Body() updateItemDto: UpdateItemDto) {
		return this.itemService.update(+id, updateItemDto)
	}

	@Delete(':id')
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.itemService.remove(+id)
	}
}
