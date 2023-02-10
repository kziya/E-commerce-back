import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import ErrorMessagesEnum from '../enums/error-messages.enum';
import { UserNotExists } from '../decorators/validation/user-not-exists.decorator';
import { Match } from '../decorators/validation/match.decorator';
import { UserCreateDto } from '../../user/user.types';

export class SignUpDto extends UserCreateDto {
  @IsNotEmpty({ message: ErrorMessagesEnum.confirmPassCanNotBeEmpty })
  @Match('password', { message: ErrorMessagesEnum.confirmPassEqual })
  confirmPassword: string;
}
