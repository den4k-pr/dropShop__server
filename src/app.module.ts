import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config'
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/products.module';
import { SubCategoryModule } from './subCategory/subCategory.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), CategoryModule, ProductModule, SubCategoryModule, UserModule],
	providers: [PrismaService]
})
export class AppModule {}
