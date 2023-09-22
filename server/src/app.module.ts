import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@prisma/prisma.module';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CityModule } from './city/city.module';
import { WeatherModule } from './weather/weather.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
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
