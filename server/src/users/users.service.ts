import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import failResponse from 'src/entities/fail-response.entities';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto): Promise<IUser> {
    try {
      const user = await this.prisma.user.create({ data: userDto });
      return user;
    } catch (error: any) {
      throw new ConflictException(failResponse('Error creating user'));
    }
  }

  async findOne(identifier: string): Promise<IUser> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { OR: [{ id: identifier }, { email: identifier }] },
        include: { cities: true },
      });
      return user;
    } catch (error) {
      throw new ConflictException(failResponse('Error finding user'));
    }
  }
}
