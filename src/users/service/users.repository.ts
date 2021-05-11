import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ALREADY_REGISTERED_ERROR, WRONG_PASSWORD } from '../../constants/message.constants';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
	async createUser(createUserDto: CreateUserDto): Promise<void> {
		const { name, email, password, city } = createUserDto;
		const user = new User();
		user.email = email;
		user.city = city;
		user.name = name;
		user.salt = await bcrypt.genSalt();
		user.password = await this.hashPassword(password, user.salt);
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

	async validateUserPassword(email: string, pass: string): Promise<User> {
		const user = await this.findOne({ email });

		if (user && (await user.validatePassword(pass))) {
			return user;
		} else {
			throw new UnauthorizedException(WRONG_PASSWORD);
		}
	}

	private async hashPassword(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}
}
