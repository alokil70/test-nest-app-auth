import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { NOT_FOUND } from '../constants/message.constants';
import { User } from './user.entity';

export type Users = any;

@Injectable()
export class UsersService {
	constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository) {}

	async getAll(): Promise<User[]> {
		const found = await this.usersRepository.find();
		if (!found.length) {
			throw new NotFoundException(NOT_FOUND);
		}
		return found;
	}

	async getById(id: number): Promise<User> {
		const found = await this.usersRepository.findOne(id);
		if (!found) {
			throw new NotFoundException(NOT_FOUND);
		}
		return found;
	}

	create(createUserDto: CreateUserDto): Promise<void> {
		return this.usersRepository.createUser(createUserDto);
	}

	async delete(id: number): Promise<void> {
		const result = await this.usersRepository.delete(id);
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
	private readonly users = [
		{
			userId: 1,
			username: 'john',
			password: 'changeme',
		},
		{
			userId: 2,
			username: 'maria',
			password: 'guess',
		},
	];

	async findOne(username: string): Promise<Users | undefined> {
		return this.users.find((users) => users.username === username);
	}
}
