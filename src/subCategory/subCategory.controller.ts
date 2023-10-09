import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { SubCategoryDto } from './subCategory.dto'
import { SubCategoryService } from './subCategory.service'

@Controller('subCategories')
export class SubCategoryController {
	constructor(private readonly subCategoryService: SubCategoryService) {}

	@Get(':subCategorySlug/products')
	async getProductsByCategory(
		@Param('subCategorySlug') subCategorySlug: string,
		@Query('page') page: number,
		@Query('perPage') perPage: number,
	) {
		return this.subCategoryService.getProductsBySubCategory(subCategorySlug, page, perPage);
	}
	
	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.subCategoryService.getAll()
	}

	@Get('by-slug/:categorySlug')
	async getBySlug(@Param('categorySlug') subCategorySlug: string) {
		return this.subCategoryService.bySlug(subCategorySlug)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async createProduct(@Body() dto: SubCategoryDto) {
		return this.subCategoryService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	async updateProduct(@Param('id') id: string, @Body() dto: SubCategoryDto) {
		return this.subCategoryService.update(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	async deleteProduct(@Param('id') id: string) {
		return this.subCategoryService.delete(id)
	}

	@Get(':id')
	async getProduct(@Param('id') id: string) {
		return this.subCategoryService.byId(id)
	}
}
