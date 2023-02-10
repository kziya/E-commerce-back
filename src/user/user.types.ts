import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { user_status } from '@prisma/client';

import ErrorMessagesEnum from '../auth/enums/error-messages.enum';
import { UserNotExists } from '../auth/decorators/validation/user-not-exists.decorator';

export class UserCreateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsEmail({}, { message: ErrorMessagesEnum.emailNotValid })
  @UserNotExists()
  email: string;

  @Length(8, 20, { message: ErrorMessagesEnum.passwordLength })
  password: string;
}
export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @Length(8, 20, { message: ErrorMessagesEnum.passwordLength })
  password: string;

  @IsOptional()
  @IsEnum(user_status)
  status: user_status;
}
