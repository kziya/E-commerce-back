import { IsEmail, Length } from 'class-validator';

import ErrorMessagesEnum from '../enums/error-messages.enum';
import { UserExists } from '../decorators/validation/user-exists.decorator';

export class LoginDto {
  @UserExists()
  @IsEmail({}, { message: ErrorMessagesEnum.emailNotValid })
  email: string;

  @Length(8, 20, { message: ErrorMessagesEnum.passwordLength })
  password: string;
}
