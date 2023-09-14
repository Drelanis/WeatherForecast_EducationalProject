import {
  BadRequestException,
  ConflictException,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { UsersService } from '@users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(userDto: LoginUserDto, response: Response, userAgent: string) {
    try {
      const user = await this.validateUser(userDto);
      const tokens = await this.tokenService.generateTokens(user, userAgent);
      this.tokenService.setRefreshTokenToCookies(tokens, response);
      return response
        .status(HttpStatus.CREATED)
        .json({ accessToken: tokens.accessToken });
    } catch (error) {
      throw new ConflictException('Authorization error', error.message);
    }
  }

  async registration(userDto: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      const user = await this.userService.create({
        ...userDto,
        password: hashPassword,
        passwordRepeat: hashPassword,
      });
      return user;
    } catch (error) {
      throw new BadRequestException('Registration Error');
    }
  }

  private async validateUser(data: LoginUserDto) {
    try {
      const user = await this.userService.findOne(data.email);
      await bcrypt.compare(data.password, user.password);
      return user;
    } catch (error) {
      throw new BadRequestException('Uncorrect email or password');
    }
  }
}
