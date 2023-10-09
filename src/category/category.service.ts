import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CategoryDto } from './category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getProductsByCategory(categorySlug: string, page: number, perPage: number) {
		const skip = (page - 1) * perPage;
		const category = await this.prisma.category.findFirst({
		  where: {
			categorySlug,
		  },
		  include: {
			products: {
			  skip,
			  take: Number(perPage),
			},
		  },
		});
	
		if (!category) {
		  throw new NotFoundException('SubCategory not found');
		}
	
		return category.products;
	}

	async byId(id: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			},
			include: {
				products: true
			}
		})

		if (!category) {
			throw new Error('Category not found')
		}

		return category
	}

	async bySlug(categorySlug: string) {
		const category = await this.prisma.category.findFirst({
			where: {
				categorySlug
			},
			include: {
				products: true
			}
		})

		if (!category) {
			throw new NotFoundException('Category not found')
		}

		return category
	}

	async getAll() {
		return this.prisma.category.findMany({
			include: {
				products: true,
				subCategory: {
					include: {
					  products: true
					}
				}
			}
		})
	}

	async getAllCategory() {
		return this.prisma.category.findMany({
			include: {
				products: false,
				subCategory: {
					include: {
					  products: false
					}
				}
			}
		})
	}

	async create(dto: CategoryDto) {
		return this.prisma.category.create({
			data: {
				name: dto.name,
				categorySlug: dto.categorySlug,
				images: dto.images
			}
		})
	}

	async update(id: string, dto: CategoryDto) {
		return this.prisma.category.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				categorySlug: dto.categorySlug,
				images: dto.images
			}
		})
	}

	async delete(id: string) {
		return this.prisma.category.delete({
			where: {
				id
			}
		})
	}
}
