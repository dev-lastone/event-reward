import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserLastLoginDateDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
