import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post('login')
	login(@Body(ValidationPipe) createUserDto: CreateUserDto) {
		return this.authService.login(createUserDto);
	}
}
