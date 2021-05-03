import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
	constructor(@InjectRepository(UserRepository) private userRepository: UserRepository, private jwtService: JwtService) {}
	async login(createUserDto: CreateUserDto) {
		const email = await this.userRepository.validateUserPassword(createUserDto);
		const token = await this.jwtService.sign({ email });
		return { token };
	}

	async getUserByToken(token: string) {
		try {
			console.log('token', token);
			const payload = { token };
			console.log('payloadddddddddddd', payload);
			const user = await this.jwtService.decode(token);
			console.log('uuuuuuuuuuuuusssssssssssseeeeeeeeeeeeeeeerrrrrrrrrrr', user);
			// return this.userRepository.findOne({ user });
		} catch (e) {
			console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerror', e);
		}
	}
}
