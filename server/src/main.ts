import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(PORT, () => console.log(PORT));
};

start();
