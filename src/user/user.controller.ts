import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	getAll() {
		return this.userService.getAll();
	}

	@Get(':id')
	getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.userService.getById(id);
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto): Promise<void> {
		return this.userService.create(createUserDto);
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.userService.delete(id);
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() createUserDto: CreateUserDto): Promise<User> {
		return this.userService.update(id, createUserDto);
	}
}
