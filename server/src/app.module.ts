import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '@prisma/prisma.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

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
  ],
})
export class AppModule {}
