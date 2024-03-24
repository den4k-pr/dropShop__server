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
import { CategoryDto } from './category.dto'
import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get(':categorySlug/products')
	async getProductsByCategory(
		@Param('categorySlug') categorySlug: string,
		@Query('page') page: number,
		@Query('perPage') perPage: number,
	) {
		return this.categoryService.getProductsByCategory(categorySlug, page, perPage);
	}

	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	@Get('category')
	async getAllCategory() {
		return this.categoryService.getAllCategory()
	}

	@Get('by-slug/:categorySlug')
	async getBySlug(@Param('categorySlug') categorySlug: string) {
		return this.categoryService.bySlug(categorySlug)
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return this.categoryService.byId(id)
	}

	@HttpCode(200)
	@Post()
	async create(@Body() dto: CategoryDto) {
		return this.categoryService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.categoryService.delete(id)
	}
}
