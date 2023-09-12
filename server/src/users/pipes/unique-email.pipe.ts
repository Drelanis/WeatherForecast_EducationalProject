import { PipeTransform, Inject } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ValidationException } from 'src/exceptions/validation.exception';
import { IUserErrorResponse } from '../interfaces/user-error-response.interface';
import failResponse from 'src/entities/fail-response.entities';

export class UniqueEmailPipe implements PipeTransform {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  async transform(value: CreateUserDto) {
    const user = await this.userService.findByEmail(value.email);
    if (!user) {
      return value;
    }
    const errorObj: IUserErrorResponse = failResponse('Validation error', {});
    errorObj.property.email = 'A user with this email already exists';
    throw new ValidationException<IUserErrorResponse>(errorObj);
  }
}
