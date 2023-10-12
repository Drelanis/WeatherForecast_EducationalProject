import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UsersCityInput } from './dto/users-city.input';
import { ValidationPipe } from '@nestjs/common';
import { UserProfile } from './models/user-profile.model';
import { UserCities } from './models/user-cities.model';

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
    const user = await this.userService.findUsersWeather(identifier);
    return user;
  }

  @Mutation(() => UserCities)
  async addCity(@Args('dto', ValidationPipe) dto: UsersCityInput) {
    const user = await this.userService.addCity(dto);
    return user;
  }

  @Mutation(() => UserCities)
  async deleteCity(@Args('dto', ValidationPipe) dto: UsersCityInput) {
    const user = await this.userService.deleteCity(dto);
    return user;
  }

  @ResolveField()
  fullName(@Parent() user: UserProfile) {
    return `${user.firstName} ${user.lastName}`;
  }
}
