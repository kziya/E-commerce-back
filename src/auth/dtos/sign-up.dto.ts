import { IsNotEmpty } from 'class-validator';

import ErrorMessagesEnum from '../enums/error-messages.enum';
import { Match } from '../decorators/validation/match.decorator';
import { UserCreateDto } from '../../user/user.types';

export class SignUpDto extends UserCreateDto {
  @IsNotEmpty({ message: ErrorMessagesEnum.confirmPassCanNotBeEmpty })
  @Match('password', { message: ErrorMessagesEnum.confirmPassEqual })
  confirmPassword: string;
}
