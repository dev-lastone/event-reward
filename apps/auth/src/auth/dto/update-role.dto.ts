import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../user/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty({
    enum: UserRole,
  })
  role: UserRole;
}
