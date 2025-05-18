import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RewardType } from '../entity/reward.entity';

export class CreateRewardDto {
  @ApiProperty({
    enum: RewardType,
  })
  @IsString()
  @IsNotEmpty()
  type: RewardType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiPropertyOptional()
  @IsString()
  description?: string;
}
