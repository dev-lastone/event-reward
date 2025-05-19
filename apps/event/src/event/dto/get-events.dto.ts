import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../../../auth/src/user/entity/user.entity';

export class GetEventsDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
