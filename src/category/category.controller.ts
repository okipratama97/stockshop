import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { FindAllCategory } from './interfaces/category.interface'
import { Response } from 'express'
import { APIResponse } from 'src/helpers/api-response'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	async create(@Res() res: Response, @Body() createCategoryDto: CreateCategoryDto) {
		try {
			const serviceResponse: APIResponse = await this.categoryService.create(createCategoryDto)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			return res.status(e?.status_code).send(e)
		}
	}

	@Get('public')
	async findAll(@Res() res: Response, @Query() query: FindAllCategory) {
		try {
			const serviceResponse: APIResponse = await this.categoryService.findAll(query)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			return res.status(e?.status_code).send(e)
		}
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.categoryService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
		return this.categoryService.update(+id, updateCategoryDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoryService.remove(+id)
	}
}
