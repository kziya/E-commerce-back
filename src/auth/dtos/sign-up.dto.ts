import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

import ErrorMessagesEnum from '../enums/error-messages.enum';
import { UserNotExists } from '../decorators/validation/user-not-exists.decorator';
import { Match } from '../decorators/validation/match.decorator';

export class SignUpDto {
  firstName?: string;
  lastName?: string;

  @IsEmail({}, { message: ErrorMessagesEnum.emailNotValid })
  @UserNotExists()
  email: string;

  @Length(8, 20, { message: ErrorMessagesEnum.passwordLength })
  password: string;

  @IsNotEmpty({ message: ErrorMessagesEnum.confirmPassCanNotBeEmpty })
  @Match('password', { message: ErrorMessagesEnum.confirmPassEqual })
  confirmPassword: string;
}
