import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	const configService = app.get(ConfigService);
	app.enableCors();
	app.setGlobalPrefix('api');
	const PORT = configService.get('APP_PORT');
	await app.listen(PORT, '0.0.0.0');
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
