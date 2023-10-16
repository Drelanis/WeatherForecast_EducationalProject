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
import { Inject, ValidationPipe } from '@nestjs/common';
import { UserProfile } from './models/user-profile.model';
import { UserCities } from './models/user-cities.model';
import { PubSub } from 'graphql-subscriptions';
import { Public } from '@common/decarators/isPublic.decorator';

@Resolver((of) => UserProfile)
export class UsersResolver {
  constructor(
    @Inject('PUB_SUB') private pubSub: PubSub,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @Subscription(() => UserCities, {
    filter: (payload, variables) => {
      return payload.citiesUpdated.id === variables.identifier;
    },
  })
  citiesUpdated(@Args('identifier') identifier: string) {
    return this.pubSub.asyncIterator(`citiesUpdated_${identifier}`);
  }

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
    this.pubSub.publish(`citiesUpdated_${user.id}`, { citiesUpdated: user });
    return user;
  }

  @Mutation(() => UserCities)
  async deleteCity(@Args('dto', ValidationPipe) dto: UsersCityInput) {
    const user = await this.userService.deleteCity(dto);
    this.pubSub.publish(`citiesUpdated_${user.id}`, { citiesUpdated: user });
    return user;
  }

  @ResolveField()
  fullName(@Parent() user: UserProfile) {
    return `${user.firstName} ${user.lastName}`;
  }
}
