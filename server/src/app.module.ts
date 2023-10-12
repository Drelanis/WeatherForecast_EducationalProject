import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { CityModule } from './city/city.module';
import { WeatherModule } from './weather/weather.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AccessTokenGuard } from '@common/guards/access-token.guard';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: {
        settings: {
          'request.credentials': 'same-origin',
        },
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CityModule,
    WeatherModule,
  ],
})
export class AppModule {}
