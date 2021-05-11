import { Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Request() req) {
		console.log('AuthController login', req.user);
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		console.log('AuthController user', req.user);
		return req.user;
	}

	@HttpCode(200)
	@Post('logout')
	logOut() {}

	/*@UseGuards(JwtAuthGuard)
	@Post('refresh')
	async refresh(@Request() req) {
		const admin =  await this.adminRepository.findOne(req.user.id);
		return this.authService.login(admin);
	}*/
}
