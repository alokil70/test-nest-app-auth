import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: 'secret_orm',
			signOptions: { expiresIn: '24h' },
		}),
		TypeOrmModule.forFeature([UserRepository]),
	],
	controllers: [UserController, AuthController],
	providers: [UserService, AuthService],
})
export class UserModule {}
