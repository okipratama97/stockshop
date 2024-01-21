import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [CustomerModule, AdminModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
