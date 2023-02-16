import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE, OPTIONS, PATCH',
    allowedHeaders: 'Content-Type, Authorization',
  });
  // app.use((req, res, next) => {
  //   setTimeout(() => next(), 2000);
  // });
  await app.listen(3001);
}
bootstrap();
