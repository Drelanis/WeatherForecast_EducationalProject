import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@prisma/prisma.module';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CityModule } from './city/city.module';
import { WeatherModule } from './weather/weather.module';
import { TokenModule } from './token/token.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApiModule } from './weather-api/weather-api.module';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
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
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CityModule,
    WeatherModule,
    TokenModule,
    ApiModule,
  ],
})
export class AppModule {}
