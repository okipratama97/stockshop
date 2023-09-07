import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { CartService } from './cart.service'
import { CreateCartDto } from './dto/create-cart.dto'
import { UpdateCartDto } from './dto/update-cart.dto'
import { Response } from 'express'
import { APIResponse } from 'src/helpers/api-response'
import { RemoveItemFromCartDto } from './dto/remove-item-from-cart.dto'
import { AddItemToCartDto } from './dto/add-item-to-cart.dto'
import { genHttpException } from 'src/helpers/error'
import { User } from 'src/decorators/user.decorator'
import { Customer } from 'src/customer/entities/customer.entity'
import { AuthGuard } from 'src/guards/auth.guard'

@Controller('carts')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Post()
	create(@Body() createCartDto: CreateCartDto) {
		return this.cartService.create(createCartDto)
	}

	@Post('/add-item')
	async addItem(@Res() res: Response, @Body() addItemDto: AddItemToCartDto) {
		try {
			const customer = { id: '8539d7ce-9e46-49f3-ad33-e2800e830b33' }
			const serviceResponse: APIResponse = await this.cartService.addItem(addItemDto, customer)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw genHttpException(e)
		}
	}

	@Post('/remove-item')
	async removeItem(@Res() res: Response, @Body() removeItemDto: RemoveItemFromCartDto) {
		try {
			const customer = { id: '8539d7ce-9e46-49f3-ad33-e2800e830b33' }
			const serviceResponse: APIResponse = await this.cartService.removeItem(removeItemDto, customer)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw genHttpException(e)
		}
	}

	@Get()
	findAll() {
		return this.cartService.findAll()
	}

	@Get('/my-cart')
	@UseGuards(AuthGuard)
	async myCart(@User() customer: Partial<Customer>, @Res() res: Response) {
		try {
			const serviceResponse: APIResponse = await this.cartService.myCart(customer)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw genHttpException(e)
		}
	}

	@Get(':id')
	async findOne(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
		try {
			const serviceResponse: APIResponse = await this.cartService.findOne(id)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw genHttpException(e)
		}
	}

	@Patch(':id')
	update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCartDto: UpdateCartDto) {
		return this.cartService.update(+id, updateCartDto)
	}

	@Delete(':id')
	async deleteCart(@Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
		try {
			const customer = { id: '8539d7ce-9e46-49f3-ad33-e2800e830b33' }
			const serviceResponse: APIResponse = await this.cartService.deleteCart(id, customer.id)
			return res.status(serviceResponse.status_code).send(serviceResponse)
		} catch (e: any) {
			throw genHttpException(e)
		}
	}
}
