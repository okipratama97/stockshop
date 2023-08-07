import { Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from './entities/admin.entity'
import { AdminRepository } from './repositories/admin.repository'

@Module({
	imports: [TypeOrmModule.forFeature([Admin])],
	controllers: [AdminController],
	providers: [AdminRepository, AdminService],
	exports: [TypeOrmModule, AdminService]
})
export class AdminModule {}
