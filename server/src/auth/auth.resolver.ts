import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserAgent } from '@common/decarators/user-agent.decorator';
import { LoginUserInput } from './dto/user-login.input';
import { Cookie } from '@common/decarators/get-cookies.decarator';
import { HttpStatus, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserResgistrationInput } from './dto/user-registration.input';
import { User } from '@users/models/user.model';
import { AccessToken } from '@token/models/access-token.model';
import { UniqueEmailPipe } from './pipes/unique-email.pipe';
import { Public } from '@common/decarators/isPublic.decorator';

@Public()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessToken)
  async login(
    @Args('loginUserInput', ValidationPipe) loginUserInput: LoginUserInput,
    @Context() context: { response: Response },
    @UserAgent() userAgent: string,
  ) {
    const token = await this.authService.login(
      loginUserInput,
      context.response,
      userAgent,
    );
    console.log(token);
    return token;
  }

  @Query(() => Boolean)
  async logout(
    @Cookie(process.env.REFRESH_TOKEN) refreshToken: string,
    @Res() response: Response,
  ) {
    if (!refreshToken) {
      response.send(HttpStatus.OK);
    }
    await this.authService.logout(refreshToken, response);
    response.send(HttpStatus.OK);
  }

  @Mutation(() => User)
  @UsePipes(UniqueEmailPipe)
  async registration(
    @Args('userRegistrationInput', ValidationPipe)
    userResgistrationInput: UserResgistrationInput,
  ) {
    const user = this.authService.registration(userResgistrationInput);
    return user;
  }
}
