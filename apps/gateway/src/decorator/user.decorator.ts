import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'common/type/jwt-payload';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
