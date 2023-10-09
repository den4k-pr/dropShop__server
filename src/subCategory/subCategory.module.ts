import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { SubCategoryService } from './subCategory.service'
import { SubCategoryController } from './subCategory.controller'

@Module({
	controllers: [SubCategoryController],
	providers: [SubCategoryService, PrismaService]
})
export class SubCategoryModule {}
