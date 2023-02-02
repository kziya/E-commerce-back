import { IsEmail, Length } from 'class-validator';

import ErrorMessagesEnum from '../enums/error-messages.enum';
import { UserExists } from '../decorators/validation/user-exists.decorator';
import { PasswordCheck } from '../decorators/validation/password-check.decorator';

export class LoginDto {
  @UserExists()
  @IsEmail({}, { message: ErrorMessagesEnum.emailNotValid })
  email: string;

  @PasswordCheck()
  @Length(8, 20, { message: ErrorMessagesEnum.passwordLength })
  password: string;
}
