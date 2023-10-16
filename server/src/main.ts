import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AuthMiddleware } from '@common/middlewares/auth.middleware';

const start = async () => {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.SECRET_KEY));
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  await app.listen(PORT, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
  });
};

start();
