import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../user/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty({
    enum: UserRole,
  })
  role: UserRole;
}
