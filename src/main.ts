import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //hace la magia para parsear los datos del cliente
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //que se admita lo que esta en el dto
      forbidNonWhitelisted: true, //este le tiraun error al cliente
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Documentación del backend')
    .setVersion('1.0')

    // JWT
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )

    .addSecurityRequirements('access-token')

    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
