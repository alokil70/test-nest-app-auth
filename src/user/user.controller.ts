import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	getAll(createUserDto: CreateUserDto) {
		return this.userService.getAll(createUserDto);
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.create(createUserDto);
	}

	@Delete(':id')
	delete() {}
}
