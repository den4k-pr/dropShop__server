import { IsString } from 'class-validator'

export class SubCategoryDto {
	@IsString()
	name: string
    @IsString()
	subCategorySlug: string
    @IsString()
	categoryId: string
}
