import { IsString } from 'class-validator'

export class UserDto {
	@IsString()
	name: string
    @IsString()
	lastName: string
    @IsString()
	email: string
    @IsString()
	password: string 
	@IsString()
	soldProducts: string[]
}
