import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'

export class RemoveItemFromCartDto {
	@IsNotEmpty()
	@IsString()
	item_id: string

	@IsNotEmpty()
	@IsNumber()
	@Min(1)
	amount: number
}
