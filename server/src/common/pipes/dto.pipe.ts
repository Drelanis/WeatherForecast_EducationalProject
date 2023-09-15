import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/common/exceptions/validation.exception';
import { IUserErrorResponse } from '../../users/interfaces/user-error-response.interface';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import failResponse from '@common/utils/fail-response.utils';

export class DtoPipe implements PipeTransform<any> {
  async transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);
    if (!errors.length) {
      return value;
    }
    const errorObj: IUserErrorResponse = failResponse('Validation error', {});
    errors.map(({ property, constraints }) => {
      errorObj.property[property] = Object.values(constraints).join(', ');
    });
    throw new ValidationException<IUserErrorResponse>(errorObj);
  }
}
