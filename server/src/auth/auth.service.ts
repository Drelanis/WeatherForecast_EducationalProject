import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@users/dto/create-user.dto';
import { IUser } from '@users/interfaces/user.interface';
import { UsersService } from '@users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(userDto: LoginUserDto) {
    try {
      const user = await this.validateUser(userDto);
      const accessToken = await this.getAccessToken(user);
      return { accessToken };
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
      const token = await this.getAccessToken(user);
      return { token };
    } catch (error) {
      throw new ConflictException('Registration Error');
    }
  }

  private async getAccessToken(user: IUser): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
      cities: user.cities,
    };
    return this.jwtService.sign(payload);
  }

  // private async getRefreshToken(userId: string): Promise<string> {
  //   return this.prisma.token.create({
  //     data: {
  //       token: v4(),
  //       exp: add(new Date(), { days: 1 }),
  //       userId,
  //     },
  //   });
  // }

  private async validateUser(data: LoginUserDto) {
    const user = await this.userService.findOne(data.email);
    const passwordEquals = await bcrypt.compare(data.password, user.password);
    if (!user || !passwordEquals) {
      throw new UnauthorizedException('Uncorrect email or password');
    }
    return user;
  }
}
