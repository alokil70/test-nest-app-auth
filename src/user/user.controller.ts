import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService, private authService: AuthService) {}

	@Get()
	getAll() {
		return this.userService.getAll();
	}

	@Get('token')
	getByToken(@Headers('Authorization') token: string) {
		console.log('get by controller', token);
		return this.authService.getUserByToken(token);
	}

	@Get(':id')
	getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.userService.getById(id);
	}

	@Post()
	create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
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
