import { IsNotEmpty, IsString } from 'class-validator';

export class RequestEventRewardDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  rewardId: string;
}
