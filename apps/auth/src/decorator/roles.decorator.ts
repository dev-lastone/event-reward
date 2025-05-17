import { Reflector } from '@nestjs/core';
import { UserRole } from '../user/entity/user.entity';

export const Roles = Reflector.createDecorator<UserRole>();
