import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		console.log(req.user);
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('user')
	async getUser(@Request() req) {
		console.log(req.user);
		return req.user;
	}
}
