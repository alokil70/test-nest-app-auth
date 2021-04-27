import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { NOT_FOUND } from '../constants/message.constants';

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

	async getAll(createUserDto: CreateUserDto): Promise<User[]> {
		const found = await this.userRepository.find(createUserDto);
		if (!found.length) {
			throw new NotFoundException(NOT_FOUND);
		}
		return found;
	}

	create(createUserDto: CreateUserDto): Promise<User> {
		return this.userRepository.createUser(createUserDto);
	}
}
