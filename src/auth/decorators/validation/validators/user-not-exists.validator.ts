import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserRepository } from '../../../../user/user.repository';

@ValidatorConstraint({ name: 'UserNotExists', async: true })
@Injectable()
export class UserNotExistsValidator implements ValidatorConstraintInterface {
  constructor(private usersRepository: UserRepository) {}

  async validate(email: string) {
    try {
      const user = await this.usersRepository.findOneByEmail(email);
      console.log(user);
      if (user) return false;
    } catch (e) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `User is already exists !`;
  }
}
