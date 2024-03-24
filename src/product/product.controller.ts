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
	ValidationPipe,
	Patch
} from '@nestjs/common'
import { ProductDto } from './product.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll() {
		return this.productService.getAll()
	}

	@Get('paged')
	async getProductsPaged(
		@Query('page') page: number,
		@Query('perPage') perPage: number,
	) {
		return this.productService.getProductsPaged(page, perPage);
	}

	@Get('by-slug/:slug')
	async getProductBySlug(@Param('slug') slug: string) {
		return this.productService.bySlug(slug)
	}

	@Get('by-category/:id')
	async getProductsByCategory(@Param('categorySlug') id: string) {
		return this.productService.byCategory(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async createProduct(@Body() dto: ProductDto) {
		return this.productService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	async updateProduct(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.update(id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	async deleteProduct(@Param('id') id: string) {
		return this.productService.delete(id)
	}

	@Get(':id')
	async getProduct(@Param('id') id: string) {
		return this.productService.byId(id)
	}
}
