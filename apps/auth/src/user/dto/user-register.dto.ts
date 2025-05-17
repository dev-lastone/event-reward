import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  loginId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
