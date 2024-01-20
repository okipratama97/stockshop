import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { ItemStatus } from '../enums/item.enum'

export class CreateItemDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	images: any

	@IsNotEmpty()
	@IsString()
	description: string

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	price: number

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	stock: number

	@IsNotEmpty()
	@IsEnum(ItemStatus)
	status: string

	@IsNotEmpty()
	@IsBoolean()
	is_featured: boolean

	@IsNotEmpty()
	@IsString()
	category_id: string

	@IsOptional()
	options?: any
}
