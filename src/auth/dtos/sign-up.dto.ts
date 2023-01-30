import { IsEmail, Length } from 'class-validator';
import ErrorMessagesEnum from '../enums/error-messages.enum';

export class SignUpDto {
  firstName?: string;
  lastName?: string;

  @IsEmail({}, { message: ErrorMessagesEnum.emailNotValid })
  email: string;

  @Length(8, 20, { message: ErrorMessagesEnum.passwordLength })
  password: string;
}
