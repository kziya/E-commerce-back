import { IsEmail,  Length } from 'class-validator';

import ErrorMessagesEnum from '../enums/error-messages.enum';

export class LoginDto {
  @IsEmail({}, { message: ErrorMessagesEnum.emailNotValid })
  email: string;

  @Length(8, 20, { message: ErrorMessagesEnum.passwordLength })
  password: string;
}
