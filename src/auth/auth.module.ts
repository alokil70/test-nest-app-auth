import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../../tmp/u/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
	imports: [UserModule],
	providers: [AuthService, LocalStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
