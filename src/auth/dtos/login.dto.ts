import {IsEmail, IsNotEmpty, Length} from 'class-validator';

import ErrorMessagesEnum from '../enums/error-messages.enum';

export class LoginDto {
  @IsNotEmpty({ message: ErrorMessagesEnum.canNotBeEmpty })
  @IsEmail({}, { message: ErrorMessagesEnum.emailNotValid })
  email: string;

  @IsNotEmpty({ message: ErrorMessagesEnum.canNotBeEmpty })
  @Length(8, 20, { message: ErrorMessagesEnum.passwordLength })
  password: string;
}
