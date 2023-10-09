import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async getAll() {
        return this.prisma.user.findMany({
        })
    }

    async create(dto: UserDto) {
		return this.prisma.user.create({
			data: {
				name: dto.name,
                lastName: dto.lastName,
                email: dto.email,
                password: dto.password
			}
		})
	}
      
}
