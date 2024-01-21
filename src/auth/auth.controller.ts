import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CustomerLoginDto } from './dto/customer-login.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/customer/login')
	async customerLogin(@Body() customerLoginDto: CustomerLoginDto) {
		return this.authService.customerLogin(customerLoginDto)
	}
}
