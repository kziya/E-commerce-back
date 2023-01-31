import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { user } from '@prisma/client';

import { UserRepository } from '../../user/user.repository';
import { BcryptService } from '../../bcrypt/bcrypt.service';
import { LoginDto } from '../dtos/login.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class PasswordCheckValidator implements ValidatorConstraintInterface {
  constructor(
    private usersRepository: UserRepository,
    private bcryptService: BcryptService,
  ) {}

  async validate(
    password: string,
    validationArguments?: ValidationArguments & {
      object: LoginDto | SignUpDto | user;
    },
  ): Promise<boolean> {
    try {
      console.log(validationArguments.object.email);
      const user = await this.usersRepository.findOneByEmail(
        validationArguments.object?.email ?? '',
      );
      console.log(user, validationArguments.object);
      if (!user) return false;
      return user.password === password;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Password is wrong !`;
  }
}
