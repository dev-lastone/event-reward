import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../user/entity/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<UserRole>(Roles, context.getHandler());

    if (!Object.values(UserRole).includes(role)) {
      return false;
    }

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) {
      return false;
    }

    // admin 무조건 통과
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // 어드민이 아닌 경우 명시된 룰과 동일한 유저만 통과
    return user.role === role;
  }
}
