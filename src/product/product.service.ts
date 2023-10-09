import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { ProductDto } from './product.dto'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
	) {}

	async getAll() {
		return this.prisma.product.findMany()
	}

	async getProductsPaged(page: number, perPage: number) {
		const skip = (page - 1) * perPage;
		const products = await this.prisma.product.findMany({
		  skip,
		  take: 2,
		});
	
		if (!products) {
		  throw new NotFoundException('Products not found!');
		}
	
		return products;
	}

	async byId(id: string) {
		const product = await this.prisma.product.findUnique({
			where: {
				id
			},
		})

		if (!product) throw new NotFoundException('Product not found!')
		return product
	}

	async bySlug(slug: string) {
		const product = await this.prisma.product.findFirst({
			where: {
				slug
			}
		})

		if (!product) throw new NotFoundException('Product not found!')
		return product
	}

	async byCategory(id: string) {
		const products = await this.prisma.product.findMany({
			where: {
				category: {
					id: id
				}
			},
		})

		if (!products) throw new NotFoundException('Products not found!')
		return products
	}

	async create(dto: ProductDto) {
		// Перевірка наявності категорії
		const category = await this.prisma.category.findUnique({
		  where: {
			id: dto.categoryId
		  }
		});
	  
		if (!category) {
		  throw new NotFoundException('Category not found!');
		}
	  
		// Створення продукту з підключенням до категорії
		const product = await this.prisma.product.create({
		  data: {
			description: dto.description,
			name: dto.name,
			price: dto.price,
            priceDrop: dto.priceDrop,
			images: dto.images,
			colors: dto.colors,
            sizes: dto.sizes,
			slug: dto.slug,
            gender: dto.gender,
            categoryName: dto.categoryName, 
			category: {
                connect: {
                  id: dto.categoryId,
                },
            },
			subCategory: {
                connect: {
                  id: dto.subCategoryId,
                },
            },
		  }
		});    
	  
		return product.id;
	}

	async update(id: string, dto: ProductDto) {
		const { description, priceDrop, colors, images, price, subCategoryId, sizes,  name, gender, categoryName, categoryId, slug} = dto

		return this.prisma.product.update({
			where: {
				id
			},
			data: {
				description,
				name,
				price,
				priceDrop,
				images,
				colors,
				sizes,
				slug,
				gender,
				categoryName, 
				category: {
					connect: {
					id: categoryId,
					},
				},
				subCategory: {
					connect: {
					id: subCategoryId,
					},
				},
			}
		})
	}

	async delete(id: string) {
		return this.prisma.product.delete({ where: { id } })
	}
}
