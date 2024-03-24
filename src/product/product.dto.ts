import { ArrayMinSize, IsNumber, IsString } from 'class-validator'

export class ProductDto {
	@IsString()
	name: string
    
    @IsString()
	slug: string

	@IsNumber()
	price: number

    @IsNumber()
	priceDrop: number

	@IsString()
	description: string

    @IsString({ each: true })
	@ArrayMinSize(1)
	sizes: string[]

	@IsString({ each: true })
	@ArrayMinSize(1)
	images: string[]

	@IsString({ each: true })
	@ArrayMinSize(1)
	colors: string[]

	@IsString()
	categoryId: string

    @IsString()
	subCategoryId: string

    @IsString()
	gender: string

    @IsString()
	categoryName: string
}
