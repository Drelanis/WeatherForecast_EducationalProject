import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserAgent } from '@common/decarators/user-agent.decorator';
import { LoginUserInput } from './dto/user-login.input';
import { Cookie } from '@common/decarators/get-cookies.decarator';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { UserResgistrationInput } from './dto/user-registration.input';
import { User } from '@users/models/user.model';
import { AccessToken } from '@auth/models/access-token.model';
import { UniqueEmailPipe } from './pipes/unique-email.pipe';
import { Public } from '@common/decarators/isPublic.decorator';

@Public()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessToken)
  async login(
    @Args('loginUserInput', ValidationPipe) loginUserInput: LoginUserInput,
    @Context() context: { res: Response },
    @UserAgent() userAgent: string,
  ) {
    const token = await this.authService.login(
      loginUserInput,
      context.res,
      userAgent,
    );
    return token;
  }

  @Mutation(() => Boolean)
  async logout(
    @Cookie(process.env.REFRESH_TOKEN) refreshToken: string,
    @Context() context: { res: Response },
  ) {
    const isLogout = await this.authService.logout(refreshToken, context.res);
    return isLogout;
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
