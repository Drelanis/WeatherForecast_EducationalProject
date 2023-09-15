import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UsersCityDto {
  @IsNotEmpty()
  @IsString({ message: 'Incorrect data' })
  readonly userId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly cityId: number;
}
