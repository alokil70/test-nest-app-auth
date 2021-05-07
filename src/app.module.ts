import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), ConfigModule.forRoot(), UsersModule, AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
