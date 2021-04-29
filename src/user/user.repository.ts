import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ALREADY_REGISTERED_ERROR } from '../constants/message.constants';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async createUser(createUserDto: CreateUserDto): Promise<void> {
		const { name, email, password, city } = createUserDto;
		const salt = await bcrypt.genSalt();
		const user = new User();
		user.email = email;
		user.city = city;
		user.name = name;
		user.password = await this.hashPassword(password, salt);
		try {
			await user.save();
		} catch (e) {
			if (e.code === '23505') {
				throw new ConflictException(ALREADY_REGISTERED_ERROR);
			} else {
				throw new InternalServerErrorException();
			}
		}
	}

	private async hashPassword(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}
}
