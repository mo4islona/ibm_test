import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs/', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(8080);
}

bootstrap();
