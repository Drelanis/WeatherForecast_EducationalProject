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

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query(() => User)
  async getUser(@Args('identifier') identifier: string) {
    const user = await this.userService.findOne(identifier);
    return user;
  }

  @Mutation(() => User)
  async addCity(@Args('dto', ValidationPipe) dto: UsersCityInput) {
    const user = await this.userService.addCity(dto);
    return user;
  }

  @Mutation(() => User)
  async deleteCity(@Args('dto', ValidationPipe) dto: UsersCityInput) {
    const user = await this.userService.deleteCity(dto);
    return user;
  }

  @ResolveField()
  fullName(@Parent() user: User) {
    return `${user.firstName} ${user.lastName}`;
  }
}
