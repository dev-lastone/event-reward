import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../../auth/src/user/entity/user.entity';

export class UpdateAuthRoleDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty({
    enum: UserRole,
  })
  role: UserRole;
}
