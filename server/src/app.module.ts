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
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CityModule,
    WeatherModule,
    TokenModule,
  ],
})
export class AppModule {}
