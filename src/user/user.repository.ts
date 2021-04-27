import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const { name, email, password, city } = createUserDto;
		const user = new User();
		user.email = email;
		user.city = city;
		user.name = name;
		user.password = password;
		await user.save();
		return user;
	}
}
