import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { SubCategoryDto } from './subCategory.dto'

@Injectable()
export class SubCategoryService {
	constructor(
		private prisma: PrismaService,
	) {}

	async getProductsBySubCategory(subCategorySlug: string, page: number, perPage: number) {
		const skip = (page - 1) * perPage;
		const subCategory = await this.prisma.subCategory.findFirst({
		  where: {
			subCategorySlug,
		  },
		  include: {
			products: {
			  skip,
			  take: Number(perPage),
			},
		  },
		});
	
		if (!subCategory) {
		  throw new NotFoundException('SubCategory not found');
		}
	
		return subCategory.products;
	}

	async getAll() {
		return this.prisma.subCategory.findMany({
			include: {
				products: true
			}
		})
	}

	async bySlug(subCategorySlug: string) {
		const category = await this.prisma.subCategory.findFirst({
			where: {
				subCategorySlug
			},
			include: {
				products: true
			}
		})

		if (!category) {
			throw new NotFoundException('subCategory not found')
		}

		return category
	}

	async byId(id: string) {
		const subCategory = await this.prisma.subCategory.findUnique({
			where: {
				id
			},
			include: {
				products: true
			}
		})

		if (!subCategory) throw new NotFoundException('subCategory not found!')
		return subCategory
	}

	async create(dto: SubCategoryDto) {
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
		const subCategory = await this.prisma.subCategory.create({
		  data: {
			subCategorySlug: dto.subCategorySlug,
			name: dto.name,
			category: {
                connect: {
                  id: dto.categoryId,
                },
            },
		  }
		});    
	  
		return subCategory.id;
	}

	async update(id: string, dto: SubCategoryDto) {
		const { subCategorySlug, name, categoryId} = dto

		return this.prisma.subCategory.update({
			where: {
				id
			},
			data: {
				subCategorySlug,
				name,
				categoryId
			}
		})
	}

	async delete(id: string) {
		return this.prisma.subCategory.delete({ where: { id } })
	}
}
