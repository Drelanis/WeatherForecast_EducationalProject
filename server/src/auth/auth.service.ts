import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import failResponse from 'src/entities/fail-response.entities';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const token = await this.generateToken(user);
    return { token };
  }

  async registration(userDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });
    const token = await this.generateToken(user);
    return { token };
  }

  private async generateToken(user: IUser): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
      cities: user.cities,
    };
    return this.jwtService.sign(payload);
  }

  private async validateUser(data: CreateUserDto) {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException(
        failResponse('Authorisation Error', {
          password: 'Uncorrect email',
        }),
      );
    }
    const passwordEquals = await bcrypt.compare(data.password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException(
        failResponse('Authorisation Error', {
          password: 'Uncorrect password',
        }),
      );
    }
    return user;
  }
}
