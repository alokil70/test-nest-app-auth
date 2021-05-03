import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { NOT_FOUND } from '../constants/message.constants';

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

	async getAll(): Promise<User[]> {
		const found = await this.userRepository.find();
		if (!found.length) {
			throw new NotFoundException(NOT_FOUND);
		}
		return found;
	}

	async getById(id: number): Promise<User> {
		const found = await this.userRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(NOT_FOUND);
		}
		return found;
	}

	create(createUserDto: CreateUserDto): Promise<void> {
		return this.userRepository.createUser(createUserDto);
	}

	async delete(id: number): Promise<void> {
		const result = await this.userRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException(NOT_FOUND);
		}
	}

	async update(id: number, createUserDto: CreateUserDto): Promise<User> {
		const found = await this.getById(id);
		const { name, email, password, city } = createUserDto;
		found.email = email;
		found.city = city;
		found.name = name;
		found.password = password;
		await found.save();
		return found;
	}
}
