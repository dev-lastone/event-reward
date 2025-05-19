import { UserRole } from '../../../../apps/auth/src/user/entity/user.entity';

export type JwtPayload = {
  id: string;
  role: UserRole;
};
