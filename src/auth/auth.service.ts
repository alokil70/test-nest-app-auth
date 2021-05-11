import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { NOT_FOUND } from '../constants/message.constants';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findByEmail(email, pass);
		console.log('auth.service findByEmail ', user);
		if (user) {
			const { salt, password, ...result } = user;
			return result;
		}
		throw new NotFoundException(NOT_FOUND);
	}

	async login(user: any) {
		const payload = { email: user.email, name: user.name };
		return {
			token: this.jwtService.sign(payload),
		};
	}
}
