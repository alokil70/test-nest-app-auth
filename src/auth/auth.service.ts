import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
	constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}
	async login(createUserDto: CreateUserDto) {
		return this.userRepository.validateUserPassword(createUserDto);
	}
}
