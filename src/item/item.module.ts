import { Module } from '@nestjs/common'
import { ItemService } from './item.service'
import { ItemController } from './item.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from './entities/item.entity'
import { ItemRepository } from './repositories/item.repository'
import { CategoryModule } from 'src/category/category.module'

@Module({
	imports: [TypeOrmModule.forFeature([Item]), CategoryModule],
	controllers: [ItemController],
	providers: [ItemService, ItemRepository],
	exports: [ItemService]
})
export class ItemModule {}
