import { registerDecorator, ValidationOptions } from 'class-validator';

import { MatchValidator } from '../../validators/match.validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchValidator,
    });
  };
}
