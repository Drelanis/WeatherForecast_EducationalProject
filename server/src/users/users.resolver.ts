import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UsersCityInput } from './dto/users-city.input';
import { ValidationPipe } from '@nestjs/common';
import { UserProfile } from './models/user-profile.model';
import { UserCities } from './models/user-cities.model';
import { Public } from '@common/decarators/isPublic.decorator';
import pubSub from '@common/helpers/pub-sub.helper';

@Resolver((of) => UserProfile)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => UserProfile)
  async getUser(@Args('identifier') identifier: string) {
    const user = await this.userService.findOne(identifier);
    return user;
  }

  @Query(() => UserCities)
  async findUsersCities(@Args('identifier') identifier: string) {
    const user = await this.userService.findUsersCities(identifier);
    return user;
  }

  @Mutation(() => UserCities)
  async addCity(@Args('dto', ValidationPipe) dto: UsersCityInput) {
    const user = await this.userService.addCity(dto);
    pubSub.publish(`citiesUpdated_${user.id}`, { citiesUpdated: user });
    return user;
  }

  @Mutation(() => UserCities)
  async deleteCity(@Args('dto', ValidationPipe) dto: UsersCityInput) {
    const user = await this.userService.deleteCity(dto);
    pubSub.publish(`citiesUpdated_${user.id}`, { citiesUpdated: user });
    return user;
  }

  @Public()
  @Subscription(() => UserCities, {
    filter: (payload, variables) => {
      return payload.citiesUpdated.id === variables.identifier;
    },
  })
  citiesUpdated(@Args('identifier') identifier: string) {
    return pubSub.asyncIterator(`citiesUpdated_${identifier}`);
  }

  @ResolveField()
  fullName(@Parent() user: UserProfile) {
    return `${user.firstName} ${user.lastName}`;
  }
}
