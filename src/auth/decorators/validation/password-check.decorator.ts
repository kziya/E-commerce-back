import { registerDecorator, ValidationOptions } from 'class-validator';

import { PasswordCheckValidator } from '../../validators/password-check.validator';

export function PasswordCheck(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'PasswordCheck',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: PasswordCheckValidator,
    });
  };
}
