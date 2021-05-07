import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	salt: string;

	@Column()
	city: string;

	async validatePassword(password: string): Promise<boolean> {
		const hash = await bcrypt.hash(password, this.salt);
		return hash === this.password;
	}
}
