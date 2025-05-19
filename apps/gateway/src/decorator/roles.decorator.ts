import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../auth/src/user/entity/user.entity';

export const Roles = Reflector.createDecorator<UserRole>();
