import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

/*const configService = registerAs('typeorm', () => ({
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: 'task-management',
	entities: ['dist/!**!/!*.entity{.ts,.js}'],
	synchronize: true,
}));*/

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: '1234',
	database: 'task-management',
	entities: ['dist/**/*.entity{.ts,.js}'],
	synchronize: true,
};
