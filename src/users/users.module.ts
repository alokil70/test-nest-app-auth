import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersRepository } from './service/users.repository';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([UsersRepository])],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
