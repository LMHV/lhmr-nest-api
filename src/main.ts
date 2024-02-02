import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
