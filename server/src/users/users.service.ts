import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<IUser> {
    const user: IUser = await this.prisma.user.create({ data: userDto });
    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: { cities: true },
    });
    return user;
  }
}
