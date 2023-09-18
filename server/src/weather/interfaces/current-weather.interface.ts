import { Prisma } from '@prisma/client';

export interface ICurrentWeather {
  id: number;
  weatherId: number;
  updatedAt: Date;
  currentWeather: Prisma.JsonValue;
}
