import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../../../../user/user.repository';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private usersRepository: UserRepository) {}

  async validate(email: string) {
    try {
      const user = await this.usersRepository.findOneByEmail(email);
      console.log(user);
      if (!user) return false;
    } catch (e) {
      console.log(e);
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist !`;
  }
}
