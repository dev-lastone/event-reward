import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../entity/user.entity';

export class UserUpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
