import { registerDecorator, ValidationOptions } from 'class-validator';
import { UserNotExistsValidator } from '../../validators/user-not-exists.validator';

export function UserNotExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserNotExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserNotExistsValidator,
    });
  };
}
