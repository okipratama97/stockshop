import { Module } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CustomerController } from './customer.controller'
import { Customer } from './entities/customer.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerRepository } from './repositories/customer.repository'

@Module({
	imports: [TypeOrmModule.forFeature([Customer])],
	controllers: [CustomerController],
	providers: [CustomerService, CustomerRepository],
	exports: [CustomerService, CustomerRepository]
})
export class CustomerModule {}