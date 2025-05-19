import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../../../auth/src/user/entity/user.entity';

export class GetEventDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
