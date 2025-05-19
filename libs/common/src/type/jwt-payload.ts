import { UserRole } from '../../../../apps/auth/src/user/entity/user.entity';

export type JwtPayload = {
  _id: string;
  role: UserRole;
  iat?: number;
  exp?: number;
};
