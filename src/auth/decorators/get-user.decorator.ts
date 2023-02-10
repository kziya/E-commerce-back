import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { SignedUserPayload } from '../auth.types';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): SignedUserPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
