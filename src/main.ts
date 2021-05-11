import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	const configService = app.get(ConfigService);
	app.enableCors();
	app.setGlobalPrefix('api');
	const PORT = configService.get('APP_PORT');

	const config = new DocumentBuilder()
		.setTitle('REST server')
		.setDescription('backend server')
		.setVersion('0.1.0')
		.addTag('Marafon')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(PORT, '0.0.0.0');
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
