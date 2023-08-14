import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCategoryDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsNumber()
	order: number

	@IsNotEmpty()
	@IsString()
	image: string

	options?: any
}
