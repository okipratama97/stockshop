import { HttpStatus, Injectable } from '@nestjs/common'
import { makeResError } from 'src/helpers/error'
import { CustomerRepository } from 'src/customer/repositories/customer.repository'
import { apiResWrapper } from 'src/helpers/api-response'
import { CustomerLoginDto } from './dto/customer-login.dto'
import { comparePassword } from 'src/helpers/bcrypt'
import { jwtSign } from 'src/helpers/jwt'

@Injectable()
export class AuthService {
	constructor(readonly customerRepository: CustomerRepository) {}

	async customerLogin(customerLoginDto: CustomerLoginDto) {
		try {
			const customer = await this.customerRepository.findOne({ where: { email: customerLoginDto.email } })
			if (!customer) throw apiResWrapper(HttpStatus.BAD_REQUEST, 'Wrong email or password')

			const comparePass = await comparePassword(customerLoginDto.password, customer.password)
			if (!comparePass) throw apiResWrapper(HttpStatus.BAD_REQUEST, 'Wrong email or password')

			const accessToken = jwtSign({ email: customer.email })
			return apiResWrapper(HttpStatus.OK, 'Successfully login', { access_token: accessToken })
		} catch (error) {
			return Promise.reject(makeResError(error, HttpStatus.BAD_REQUEST, 'Login failed'))
		}
	}
}
