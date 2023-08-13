import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export enum ItemStatus {
	AVAILABLE = 'AVAILABLE',
	UNAVAILABLE = 'UNAVAILABLE'
}

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
	price: number

	@IsNotEmpty()
	@IsNumber()
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
}
