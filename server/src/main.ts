import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.SECRET_KEY));
  app.enableCors({
    origin: [process.env.WEB_CLIENT_URL, process.env.MOBILE_CLIENT_URL],
    credentials: true,
  });
  await app.listen(PORT, '192.168.0.141', async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
  });
};

start();
