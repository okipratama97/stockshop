import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config/config'
import { ConfigModule } from '@nestjs/config'
import { AdminModule } from './admin/admin.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from './admin/entities/admin.entity'
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { CartModule } from './cart/cart.module';
import { CustomerModule } from './customer/customer.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config]
		}),
		TypeOrmModule.forRoot({
			type: config().database.type,
			host: config().database.host,
			port: config().database.port,
			username: config().database.user,
			password: config().database.pass,
			database: config().database.name,
			entities: [Admin],
			synchronize: true,
			autoLoadEntities: true
		}),
		AdminModule,
		CategoryModule,
		ItemModule,
		CartModule,
		CustomerModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
