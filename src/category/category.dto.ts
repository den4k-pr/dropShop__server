import { IsString, ArrayMinSize } from 'class-validator'

export class CategoryDto {
	@IsString()
	name: string
    @IsString()
	categorySlug: string
    @IsString({ each: true })
	@ArrayMinSize(1)
	images: string[]
}
