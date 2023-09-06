import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsString, MaxLength, Min, MinLength } from 'class-validator'
import { CustomerStatus } from '../enums/customer.enum'

export class CreateCustomerDto {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string

	@IsNotEmpty()
	@IsString()
	password: string

	@IsNotEmpty()
	@IsNumberString()
	@MinLength(8)
	@MaxLength(15)
	phone: string

	@IsString()
	address: string

	@IsString()
	image: string

	@IsString()
	@IsEnum(CustomerStatus)
	status: string
}
