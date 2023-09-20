import { Args, Query, Resolver } from '@nestjs/graphql';
import { CityService } from './city.service';
import { City } from './models/city.model';

@Resolver()
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => [City])
  async findCities(@Args('name') name: string) {
    const cities = await this.cityService.findMany(name);
    return cities;
  }
}
