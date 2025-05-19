import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GetUserLoginDatesByPeriodDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;
}
