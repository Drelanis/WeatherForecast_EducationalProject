import { Prisma } from '@prisma/client';

export interface IForecastWeather {
  id: number;
  weatherId: number;
  updatedAt: Date;
  forecastWeather: Prisma.JsonValue;
}
