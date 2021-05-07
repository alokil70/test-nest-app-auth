import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('user')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	getAll() {
		return this.usersService.getAll();
	}

	@Get(':id')
	getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.usersService.getById(id);
	}

	@Post()
	create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
		return this.usersService.create(createUserDto);
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
		return this.usersService.delete(id);
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.update(id, createUserDto);
	}
}
