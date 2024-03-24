import { Controller, Get, Post, Body, HttpCode, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

    @Get()
	async getAll() {
		return this.userService.getAll()
	}

	@HttpCode(200)
	@Post()
	async createProduct(@Body() dto: UserDto) {
		return this.userService.create(dto)
	}
}
