import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());
  await app.listen(PORT, async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`GraphQL Playground: ${await app.getUrl()}/graphql`);
  });
};

start();
